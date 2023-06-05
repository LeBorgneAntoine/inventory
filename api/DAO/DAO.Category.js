const { getDatabaseHelperInstance } = require("../database/database");
const Category = require("../model/model.Category");
const Company = require("../model/model.Company");
const { getCompanyByID } = require("./DAO.Company");
const { getAllUsersByCompany } = require("./DAO.Employee");

/**
 * 
 * @param {Number} id
 * @returns {Promise<Array<Category>>}
 */
function getAllCategoriesByCompanyID(id){

    return new Promise((resolve, reject) => {
        getDatabaseHelperInstance().query().all('SELECT * FROM Category WHERE companyID = ?',[id], (err, rows) => {
            if (err) throw err;
            resolve(rows)
        })
    })

}


/**
 * 
 * @param {Number} companyID 
 * @param {Number} parentID 
 * @returns {Promise<Array<JSON>>} 
 */
function getAllCategoriesByCompanyIDAndParentID(companyID, parentID){

    return new Promise((resolve, reject) => {
        getDatabaseHelperInstance().query().all('SELECT * FROM Category WHERE companyID is ? AND parentID is ?',[companyID, parentID], (err, rows) => {
            if (err) throw err;
            resolve(rows)
        })
    })

}



/**
 * 
 * @param {number} id 
 * @returns {Promise<Category>}
 */
function getCategoryByID(id){

    return new Promise((resolve, reject) => {

        getDatabaseHelperInstance().query().get('SELECT * FROM Category WHERE id = ?',[id], (err, row) => {
            if (err)throw err;
            resolve(row? new Category(row) : null)
        })
    })
}

/**
 * 
 * @param {Category} category 
 * @returns {Promise<Category>}
 */
function addCategory(category){

    return new Promise((resolve) => {
        getDatabaseHelperInstance().query()
            .run('INSERT INTO Category (companyID, name, parentID) VALUES (?,?,?)', category.toArray('-id'), (err) => { if(err)throw err})
            .get('SELECT MAX(id) as id FROM Category', (err, row) => {
                if(err)throw err
                category._data.id = row?.id ?? -1;
                resolve(category)
            })
    })

   
}

function deleteCategory(folder, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Category WHERE id = ?', [folder.getID()], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

function deleteAllCategories(callback){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().run('DELETE FROM Category', [], (err) => {
            if(err)throw err
            if(callback)callback(true)
            resolve()
        })
    })
}

function deleteCategoryByID(id, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Category WHERE id = ?', [id], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

function updateCategory(updatedCategorie, callback){
    getDatabaseHelperInstance().query().run('UPDATE Category SET name = ?, parent = ?  WHERE id = ?', updatedCategorie.toArray(), (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}


module.exports = {
    getAllCategoriesByCompanyIDAndParentID,
    getAllCategoriesByCompanyID,
    getCategoryByID,
    addCategory,
    deleteCategory,
    updateCategory,
    deleteAllCategories,
    deleteCategoryByID
}
