const { getDatabaseHelperInstance } = require("../database/database");
const Category = require("../model/model.Category");
const Field = require("../model/model.Field");
const { getCategoryByID } = require("./DAO.Category");


/**
 * 
 * @param {Number} id
 * @returns {Promise<Array<JSON>>}
 */
async function getAllFieldsOfCategoryID(id){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query().all('SELECT * FROM Field WHERE categoryID = ?', [id], (err, rows) => {

            if(err)throw err;
            resolve(rows)

        })

    })
    
}


async function getAllFieldOf(forObject, linkID){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query().all('SELECT * FROM Field WHERE forObject = ? AND linkID = ?', [forObject, linkID], (err, rows) => {

            if(err)throw err;
            resolve(rows)

        })

    })

}


async function getAllLegacyFieldsOfCategoryID(id){
    let fields = []

    await getAllFieldsOfCategoryIDRecursive(id, fields);

    return fields
}

/**
 * 
 * @param {Number} id
 * @param {Array<Field>} array
 * @returns {Promise<Array>}
 */
async function getAllFieldsOfCategoryIDRecursive(id, array){

    let fields = await getAllFieldOf('CATEGORY',id)

    array.push(...fields)

    let category = await getCategoryByID(id)

    if(category){
        await getAllFieldsOfCategoryIDRecursive(category.getParentID(), array)
    }

}



/**
 * 
 * @param {Field} field 
 */
function addField(field){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query().run('INSERT INTO Field (categoryID, type, value, name) VALUES (?,?,?,?)', field.toArray('-id'), (err, rows) => {

            if(err)throw err;
            resolve()

        })

    })

}

/** 
 * 
 * @param {Field} field 
 */
function addFieldFor(field){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query().run('INSERT INTO Field (forObject, linkID, type, value, name) VALUES (?,?,?,?,?)', field.toArray('-id'), (err, rows) => {

            if(err)throw err;
            resolve()

        })

    })

}

module.exports = {

    getAllFieldsOfCategoryID,
    addField,
    getAllFieldsOfCategoryIDRecursive,
    getAllLegacyFieldsOfCategoryID,
    getAllFieldOf,
    addFieldFor
}