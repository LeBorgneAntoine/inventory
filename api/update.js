const { default: puppeteer } = require("puppeteer");
const fs = require("fs");
const Cheerio = require("cheerio");
const Reference = require("./model/model.Reference");
const Folder= require("./model/model.Folder");
const {addReference, deleteAllReferences} = require('./DAO/DAO.References');
const {addFolder, deleteAllFolder} = require('./DAO/DAO.Folder');
const { getDatabaseHelperInstance } = require("./DAO/database");


const AUTHORIZED_LINKS = /https:\/\/www\.mbkleborgne\.com\/([\d]+-[\w\W\d-\/]+|[\w\W\d-\/]+\.html)/g
let visitedPath = []
let browser;
let page;

/**
 * be aware of havy RAM load !
 * 
 * @param {String} url 
 * @returns page DOM content
 */
async function loadPageContent(url){

    if(!browser)browser = await puppeteer.launch({
        headless: "new"
    })
    
    let page = await browser.newPage()

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'image') {
          request.abort();
        } else {
          request.continue();
        }
    });

    await page.goto(url,{waitUntil: 'load', timeout: 0})

    let pageHTML = await page.content()

    page.close()

    return pageHTML;
}


/**
 * Go through all the apges possible
 * 
 * @param {String} url 
 */
async function nav(url, depth){

    await sleep(.3)

    let nbElement;
    //if is product page (https://---/---.html)
    if(url.endsWith('html')){

      fs.appendFileSync('./files/referencePage.txt', `${url}\n`)//write it in the file

    }else{

        let $;

        try{

            $ = Cheerio.load(await loadPageContent(url));

            nbElement = $('.product-count').text() //read the maximum products on the category

            if(nbElement){//some pages don't have this element

                nbElement = nbElement.split(' ').at(-1).replace('.', '')//extract the number from format: ex: "Résultats 1 - 81 sur 81." -> 81

                $ = Cheerio.load(await loadPageContent(url+'?n='+nbElement));
            }
        
        }catch(err){
            fs.appendFileSync('./files/errors.txt', `page url: ${url} \n`)//if any error appends
            return;
        }

        console.log($('.cat-name').text(), $('.product-count').text())

        let everyATag = $('a');

        //for every 'a' tag on the page check if it can be navigatable to
        for(let link of everyATag){

            if(AUTHORIZED_LINKS.test(link.attr('href')) && !visitedPath.find((val) => val === link.attr('href'))){

                let linkPath = link.attr('href')
                visitedPath.push(linkPath)
                nav(linkPath, depth+1)
            }
        

        }

    }

}


async function parseToReference(url){

    if(url && url.length > 3){
        
        $ = Cheerio.load(await loadPageContent(url))

        return {
            reference: new Reference({
                ref: $('[itemprop=sku]').prop('innerText'),
                folder: $('[itemprop=title]').text(),
                image: $('[itemprop=image]').attr('src'),
                name: $('[itemprop=name]').text(),
            }),
            folder: new Folder({
                name: $('[itemprop=title]').text()
            })
          
    }

    }

}



async function initDB(){



    let lines = fs.readFileSync('./files/referencePage.txt').toString().split('\n')

    getDatabaseHelperInstance().openDatabase('./DAO/database.db')

    await deleteAllFolder()

    await deleteAllReferences()

    let addedFolder = []

    let i = 0;

    for(let url of lines){

        let {reference, folder} = await parseToReference(url)

        console.log('('+i+'/'+lines.length+') -', reference.getName())

        addReference(reference)

        if(!addedFolder.find((val) => val.getName() === folder.getName())){
            addFolder(folder)
            addedFolder.push(folder)
        }
        i++;
    }

}



initDB()