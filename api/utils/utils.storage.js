const path = require('path')
const fs = require('fs');
const sharp = require('sharp');

function saveImageBase64(imageFile, fileName = generateRandomFileName(20)){

    return new Promise((resolve, reject) => {

        fileName += '.png'

        let fileData = imageFile.split(';base64,').pop();

        const filePath = path.join('images', `${fileName}`)
        
        fs.writeFile(filePath, fileData, {encoding: 'base64'}, (err) => {
            if(err)reject(err)
            else resolve(fileName)
        }); 
    })
}


/**
 * 
 * @param {import('express-fileupload').FileArray} imageFile 
 * @param {String} fileName 
 * @returns 
 */
function saveImageFile(imageFile, fileName = generateRandomFileName(20)){

    return new Promise(async (resolve, reject) => {

        fileName += '.' + imageFile.name.split('.').at(-1)

        const filePath = path.join('images', `${fileName}`)

        try{

            await sharp(imageFile.data)
                .resize(500)
                .jpeg({quality: 50})
                .png({quality: 50})
                .toFile(filePath)

            resolve(fileName)

        }catch(err){
            reject(err)
        }


    })
}
    
    

function generateRandomFileName(nameLength){

    let dict = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890"
    let final = ""

    for (let i = 0; i < nameLength; i++) {
        
        final += dict.at(Math.floor(Math.random() * dict.length))
        
    }

    return final;
}
   

module.exports = {
    saveImageBase64,
    saveImageFile
}