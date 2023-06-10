
const { getCompanyByID } = require("./DAO.Company");
const { getAllUsersByCompany } = require("./DAO.Employee");

/**
 * 
 * @param {Number} companyID 
 * @param {Number} userID 
 * @returns {Promise<Boolean>}
 */
function isCompanyContainUser(companyID, userID){


    return new Promise(async (resolve, reject) => {

        let companyObj = await getCompanyByID(companyID)

        let users = await getAllUsersByCompany(companyObj)

        if(users.find((user) => user.getID() === userID)){
            resolve(true)
            return;
        }

        resolve(false)

    })

}

module.exports = {
    isCompanyContainUser
}