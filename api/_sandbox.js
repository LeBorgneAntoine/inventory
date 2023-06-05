/*
const Axios = require("axios");
const cheerio = require("cheerio");
const Reference = require("./model/model.Reference");

const fs = require('fs');
const { default: puppeteer } = require("puppeteer");

const BASE_URL = 'https://www.mbkleborgne.com'

async function run(){

    nav(BASE_URL, 0)
/*
    let file = fs.readFileSync('./files/referencePage.txt')

    let allFile = file.toString().split('\n')

    for (const refUrl of allFile) {
        readReference(refUrl)
        await sleep(.2)
    }

}

let browser;

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


const LINKS = /https:\/\/www\.mbkleborgne\.com\/([\d]+-[\w\W\d-\/]+|[\w\W\d-\/]+\.html)/g

const MAX_DEPTH = 2;

let visitedPath = []



async function nav(url, depth){

    await sleep(.3)
    let nbElement;
    if(url.endsWith('html')){

      fs.appendFileSync('./files/referencePage.txt', `${url}\n`)

    }else{

        let $;
        try{

            $ = cheerio.load(await loadPageContent(url));

            nbElement = $('.product-count').text()

            //console.log(nbElement)

            if(nbElement){

                nbElement = nbElement.split(' ').at(-1).replace('.', '')

                let data = await loadPageContent(url+'?n='+nbElement)

                if(data){
                    $ = cheerio.load(data);

                    //console.log('loaded products:',$('.product_list').find('li').length)
                }
            }
        
        }catch(err){
            fs.appendFileSync('./files/errors.txt', `page url: ${url} \n`)
            return;
        }

        console.log($('.cat-name').text(),'-', $('.product-count').text())

        let everyATag = $('a');

        for(let link of everyATag){
            if(link.attribs && link.attribs.href && LINKS.test(link.attribs.href) && !visitedPath.find((val) => val === link.attribs.href)){

                let linkPath = link.attribs.href
                visitedPath.push(linkPath)
                nav(linkPath, depth+1)
            }

        }

    }

}


async function readReference(url){

    if(url && url.length > 3){
        $ = cheerio.load(await loadPageContent(url))

        console.log('---------------------------')
        console.log('Name:',$('[itemprop=name]').text())
        console.log('Reference:',$('[itemprop=sku]').prop('innerText'))
        console.log('Caterorie:',$('[itemprop=title]').text())
        console.log('Image link:',$('[itemprop=image]').attr('src'))
        console.log('url:',url)
    }

}


function sleep(sec){
    return new Promise((resolve) => setTimeout(() => resolve(), sec * 1000))
}


run()

const { getCategoryByID } = require("./DAO/DAO.Category");
const { addCompany } = require("./DAO/DAO.Company");
const { getAllFieldsOfCategoryIDRecursive } = require("./DAO/DAO.Field");
const { getDatabaseHelperInstance } = require("./database/database");
const { mail } = require("./utils/utils.mail");


getDatabaseHelperInstance().openDatabase('./database/database.db');

async function main(){

    console.log(await getCategoryByID(6))

}

main()

*/