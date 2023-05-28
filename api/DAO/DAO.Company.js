const { getDatabaseHelperInstance } = require("../database/database");
const Company = require("../model/model.Company");
const User = require("../model/model.User");
const { getAllEmployeeByUser } = require("./DAO.Employee");

/**
 * 
 * @param {String} name 
 * @returns {Promise<Company>}
 */
function getCompanyByName(name){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query().get('SELECT * FROM Company WHERE name = ?', [name], (err, row) => {
            if(err)throw err;
            resolve(new Company(row))
        })
    })
}

/**
 * 
 * @param {Company} company 
 * @returns {Promise<Company>}
 */
function addCompany(company){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query()
            .run('INSERT INTO Company (name, logoURL) VALUES (?,?)', company.toArray('-id'), (err, row) => {if(err)throw err})
            .get('SELECT MAX(id) as id FROM Company', (err, row) => {
                if(err)throw err
                company._data.id = row?.id ?? -1;
                resolve(company)
            })
    })
}

/**
 * 
 * @param {Number} id 
 * @returns {Promise<Company>}
 */
function getCompanyByID(id){

    new Promise((resolve) => {
        getDatabaseHelperInstance().query().get('SELECT * FROM Company WHERE id = ?', [id], (err, row) => {
            if(err)throw err;
            let company = new Company(row)
            resolve(company)
        })
    })

}

/**
 * 
 * @param {User} user 
 * @returns {Promise<Array<Company>>}
 */
async function getAllCompanyByUser(user){

    let employeeInAll = await getAllEmployeeByUser(user)

    console.log(employeeInAll)

    return employeeInAll
}

function deleteCompany(company){

}

function updateCompany(company){

}

module.exports = {

    getCompanyByName,
    addCompany,
    deleteCompany,
    updateCompany

}