
class Category{

    _data;

    constructor({
        id,
        name,
        parentID,
        companyID
    }){
        this._data = {
            companyID,
            name,
            parentID,
            id,
        } 
    }

    getID(){
        return this._data.id
    }

    getName(){
        return this._data.name
    }

    getParentID(){
        return this._data.parentID
    }

    getCompanyID(){
        return this._data.companyID
    }

    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }
}

module.exports = Category;