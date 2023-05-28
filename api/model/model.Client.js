

class Client{

    _data;

    constructor({
        id,
        name,

    }){
        this._data = {
            name,
            id,
        } 
    }

    getID(){
        return this._data.id
    }

    getName(){
        return this._data.name
    }

    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }
}

module.exports = Client;