const bcrypt = require('bcrypt');

/**
 * 
 * @param {String} password 
 * @returns {Promise<String>}
 */
function hashPassword(password){

    return new Promise((resolve) => {

        bcrypt.genSalt(10, function(err, salt) {
            if (err) throw err;
              
            bcrypt.hash(password, salt, function(err, hash) {
                if(err)throw err;
                resolve(hash)
            });
        });


    })

}

/**
 * 
 * @param {String} plain 
 * @param {String} hash 
 * @returns {Promise<Boolean>}
 */
function compareHash(plain, hash){

    return new Promise((resolve) => {

        bcrypt.compare(plain, hash, function(err, isMatch) {   

            if(err) throw err;

            resolve(isMatch)

        });


    })

}

module.exports  = {
    hashPassword,
    compareHash
}