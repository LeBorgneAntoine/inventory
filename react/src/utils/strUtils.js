function generateDeviceName(){

    if(navigator.userAgent.toLowerCase().match(/mobile/i)) { 
        return 'MOBILE-'+randomUpperCaseString(3)+ '-' +randomNumber(99)
    }else{
        return 'PC-'+randomUpperCaseString(3) + '-' +randomNumber(99)
    }

}

function randomUpperCaseString(length){

    let str = ''
    let alpha = 'AZERTYUIOPQSDFGHJKLMWXCVBN'

    for (let i = 0; i < length; i++) {
        
        str = str + alpha.charAt(Math.round(Math.random() * alpha.length))
        
    }

    return str
}

function randomNumber(max){
    return Math.round(Math.random() * max)
}

export {
    generateDeviceName
}