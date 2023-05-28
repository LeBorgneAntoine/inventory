const fs = require('fs')

const langs = {
    en: require('./en.json'),
    fr: require('./fr.json')
}

let selected = 'en'

function setLang(lang){

    if(Object.keys(langs).findIndex((val) => val === lang) < 0){
        return;
    }

    selected = lang;
}

function trans(value){

    return langs[selected][value]

}

module.exports = {
    trans,
    setLang
};