const { getDatabaseHelperInstance } = require("../database/database");
const Company = require("../model/model.Company");
const Employee = require("../model/model.Employee");
const User = require("../model/model.User");

/**
 * 
 * @param {Company} company 
 * @returns {Promise<Array<User>>}
 */
function getAllUsersByCompany(company){

    return new Promise((resolve) => {

        getDatabaseHelperInstance().query()
            .all('SELECT * FROM Employee, User WHERE userID = id AND companyID = ?', [company.getID], (err, rows) => {
                if(err)throw err
                resolve(rows.map((row) => new User(row)))
        })
    })

}

/**
 * 
 * @param {User} user 
 * @param {String} access 
 * @param {Company} company 
 * @returns {Promise<Employee>}
 */
function addEmployee(user, access, company){

    return new Promise((resolve) => {
        getDatabaseHelperInstance().query()
            .run('INSERT INTO Employee (userID, access, companyID) VALUES (?,?,?)', [user.getID(), access, company.getID()], (err, row) => {
                if(err)throw err
                resolve(new Employee({
                    userID: user.getID(),
                    access,
                    companyID: company.getID()
                }))
            
            })
    })

}

/**
 * 
 * @param {User} user 
 * @returns {Promise<Array<Company>>}
 */
function getAllCompanyByUser(user){
    return new Promise((resolve) => {
        getDatabaseHelperInstance().query()
            .all('SELECT * FROM Employee, Company WHERE companyID = id AND userID = ?', [user.getID()], (err, rows) => {
                if(err)throw err
                resolve(rows.map((row) => new Company(row)))
            })
    })
}

module.exports = {
    addEmployee,
    getAllCompanyByUser,
    getAllUsersByCompany
}