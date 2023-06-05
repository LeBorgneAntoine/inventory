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

        let users = await getAllUsersByCompany(await getCompanyByID(companyID))

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