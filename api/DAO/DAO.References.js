const Reference = require("../model/model.Reference");
const { getDatabaseHelperInstance } = require("./database");

/**
 * @param {Function} callback 
 * @returns {Promise}
 */
function getAllReferences(callback){
    return new Promise((resolve, reject) => {
        getDatabaseHelperInstance().query().all('SELECT * FROM Reference',[], (err, rows) => {
            if (err) throw err;
            let references = rows.map((row) => new Reference(row)._data)
            if(callback)callback(references)
            resolve(references)
        })
    })

}

/**
 * 
 * @param {Number} id
 */
function getReferenceByID(id, callback){
    getDatabaseHelperInstance().query().get('SELECT * FORM Reference WHERE id = ?',[id], (err, row) => {
        if (err)throw err;
        if(callback)callback(new Reference(row))
    })

}

/**
 * 
 * @param {Reference} reference 
 */
function addReference(reference, callback){

    if(reference.getRef()){
        getDatabaseHelperInstance().query().run('INSERT INTO Reference (ref, name, comment, image, folder, quantity) VALUES (?,?,?,?,?,?)', reference.toArray('-id'), (err) => {
            if(err)throw err
            if(callback)callback(true)
        })
    }

}

/**
 * 
 * @param {Reference} reference
 */
function deleteReference(reference, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Reference WHERE id = ?', [reference.getID()], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}


function deleteAllReferences(callback){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().run('DELETE FROM Reference', [], (err) => {
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
function deleteReferenceByID(id, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Reference WHERE id = ?', [id], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

/**
 * 
 * @param {Reference} updatedReference
 */
function updateReference(updatedReference, callback){

    getDatabaseHelperInstance().query().run('UPDATE Reference SET ref = ?, name = ?, comment = ?, image = ?, folder = ?, quantity = ?  WHERE id = ?', updatedReference.toArray(), (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}



module.exports = {
    getAllReferences,
    getReferenceByID,
    addReference,
    deleteReference,
    updateReference,
    deleteReferenceByID,
    deleteAllReferences
}