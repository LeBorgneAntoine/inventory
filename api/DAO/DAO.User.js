const { getDatabaseHelperInstance } = require("../database/database")
const User = require("../model/model.User")

function getAllUsers(){

}

/**
 * 
 * @param {String} username 
 * @returns {Promise<User>}
 */
function getUserByUsername(username){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
            if(err)throw err
            resolve(row ? new User(row) : null)
        })
    })
}

/**
 * 
 * @param {Number} id 
 * @returns {Promise<User>}
 */
function getUserByID(id){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().get('SELECT * FROM User WHERE id = ?', [id], (err, row) => {
            if(err)throw err
            resolve(row ? new User(row) : null)
        })
    })
}

/**
 * 
 * @param {String} email 
 * @returns {Promise<User>}
 */
function getUserByEmail(email){
    return new Promise((resolve) => {

        getDatabaseHelperInstance().query().get('SELECT * FROM User WHERE email = ?', [email], (err, row) => {
            if(err)throw err
            resolve(new User(row))
        })

    })
}

function deleteUser(user){

}

/**
 * 
 * @param {User} user 
 */
function addUser(user){

    return new Promise((resolve) => {
        getDatabaseHelperInstance().query()
            .run('INSERT INTO User (username, password, name, email) VALUES (?,?,?,?)', user.toArray('-id'), (err, row) => {if(err)throw err})
            .get('SELECT MAX(id) as id FROM User', (err, row) => {
                if(err)throw err
                user._data.id = row?.id ?? -1;
                resolve(user)
            })
    })

}

function updateUser(user){



}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    deleteUser,
    addUser,
    updateUser,
    getUserByID
}