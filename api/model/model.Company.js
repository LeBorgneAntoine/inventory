
class Company{

    _data;

    constructor({
        name,
        logoURL,
        id
    }){
        this._data = {
            name,
            logoURL,
            id
        }
    }

    getID(){
        return this._data.id
    }

    getName(){
        return this._data.name
    }

    getLogoURL(){
        return this._data.logoURL
    }

    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }
}

module.exports = Company