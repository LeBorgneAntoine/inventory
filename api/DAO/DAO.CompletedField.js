
async function searchFieldsValues(value){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query().all('SELECT * FROM CompletedField WHERE trim(CompletedField.value) LIKE %?%', [value], (err, rows) => {

            if(err)throw err;
            resolve(rows)

        })

    })

}


function getAllCompletedFieldsFor(forObject, linkID){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query(`
            SELECT Field.name, CompletedField.value 
            FROM Field, CompletedField
            WHERE Field.id = fieldID
            AND forObecjt = ?
            AND CompletedField.linkID = ?
        `).all('', [forObject, linkID], (err, rows) => {

            if(err)throw err;
            resolve(rows)

        })

    })

}


module.exports = {
    searchFieldsValues,
    getAllCompletedFieldsFor
}