

class Employee{

    _data;

    constructor({
        userID,
        companyID,
        access
    }){

        this._data = {
            userID,
            access,
            companyID
        }

    }

    getUserID(){
        return this._data.userID
    }

    getCompanyID(){
        return this._data.companyID
    }

    getAccess(){
        return this._data.access
    }

}

module.exports = Employee