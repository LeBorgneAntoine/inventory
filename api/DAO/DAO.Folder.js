const Folder = require("../model/model.Folder");
const { getDatabaseHelperInstance } = require("./database");

/**
 * 
 * @param {*} callback 
 * @returns {Promise}
 */
function getAllFolders(callback){

    return new Promise((resolve, reject) => {
        getDatabaseHelperInstance().query().all('SELECT * FROM Folder',[], (err, rows) => {
            if (err) throw err;
            let folders = rows.map((row) => new Folder(row)._data)
            if(callback)callback(folders)
            else resolve(folders)
        })
    })


}

/**
 * 
 * @param {number} id 
 * @param {() => void} callback 
 */
function getFolderByID(id, callback){
    getDatabaseHelperInstance().query().get('SELECT * FORM folder WHERE id = ?',[id], (err, row) => {
        if (err)throw err;
        if(callback)callback(new Folder(row))
    })
}

/**
 * 
 * @param {Folder} folder 
 */
function addFolder(folder, callback){
    getDatabaseHelperInstance().query().run('INSERT INTO Folder (name, parent) VALUES (?,?)', folder.toArray('-id'), (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

function deleteFolder(folder, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Folder WHERE id = ?', [folder.getID()], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

function deleteAllFolder(callback){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().run('DELETE FROM Folder', [], (err) => {
            if(err)throw err
            if(callback)callback(true)
            resolve()
        })
    })
}

function deleteFolderByID(id, callback){
    getDatabaseHelperInstance().query().run('DELETE FROM Folder WHERE id = ?', [id], (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}

function updateFolder(updatedFolder, callback){
    getDatabaseHelperInstance().query().run('UPDATE Folder SET name = ?, parent = ?  WHERE id = ?', updatedFolder.toArray(), (err) => {
        if(err)throw err
        if(callback)callback(true)
    })
}


module.exports = {
    getAllFolders,
    getFolderByID,
    addFolder,
    deleteFolder,
    updateFolder,
    deleteAllFolder,
    deleteFolderByID
}
