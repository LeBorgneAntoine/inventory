const Product = require("../model/model.Product");
const { getDatabaseHelperInstance } = require("../database/database");

/**
 * @param {Function} callback 
 * @returns {Promise}
 */
function getAllProducts(callback){
    return new Promise((resolve, reject) => {
        getDatabaseHelperInstance().query().all('SELECT * FROM Product',[], (err, rows) => {
            if (err) throw err;
            let products = rows.map((row) => new Product(row)._data)
            if(callback)callback(products)
            resolve(products)
        })
    })

}

/**
 * 
 * @param {Number} id
 * @returns {Promise<Array>>}
 */
function getAllProductsByCompanyIDAndCategoryID(companyID, categoryID){
    return new Promise((resolve, reject) => {
        getDatabaseHelperInstance().query().all('SELECT * FROM Product WHERE companyID is ? AND categoryID is ? ', [companyID, categoryID], (err, rows) => {
            if (err)throw err;
            resolve(rows)
        })
    })
}

/**
 * 
 * @param {Product} product 
 * @returns {}
 */
function addProduct(product){

    return new Promise((resolve, reject) => {
    
        getDatabaseHelperInstance().query()
            .run('INSERT INTO Product (categoryID, companyID, name, image) VALUES (?,?,?,?)', product.toArray('-id'), (err) => {if(err)throw err})
            .get('SELECT MAX(id) as id FROM Product', (err, row) => {
                if(err)throw err
                product._data.id = row?.id ?? -1;
                resolve(product)
            })
    })
}

/**
 * 
 * @param {Product} rroduct
 */
function deleteProduct(product, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Product WHERE id = ?', [product.getID()], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}


function deleteAllProducts(callback){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().run('DELETE FROM Product', [], (err) => {
            if(err)throw err
            if(callback)callback(true)
            resolve()
        })
    })
   
}

/**
 * 
 * @param {Number} id 
 * @param {Function} callback 
 */
function deleteProductByID(id, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Product WHERE id = ?', [id], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

/**
 * 
 * @param {Product} updatedProduct
 */
function updateProduct(updatedProduct, callback){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().run('UPDATE Product SET categoryID = ?, companyID = ?, name = ?, image = ? WHERE id = ?', updatedProduct.toArray(), (err) => {
            if(err)throw err
            resolve()
        })
    })
  
}



module.exports = {
    getAllProducts,
    getAllProductsByCompanyIDAndCategoryID,
    addProduct,
    deleteProduct,
    updateProduct,
    deleteProductByID,
    deleteAllProducts
}