

class Client{

    _data;

    constructor({
        id,
        fullname,
        email,
        phone,
        fullname,

    }){
        this._data = {
            fullname,
            email,
            phone,
            fullname,
            id,
        } 
    }

    getID(){
        return this._data.id
    }

    getFullName(){
        return this._data.fullname
    }

    getEmail(){
        return this._data.email
    }

    getPhone(){
        return this._data.phone
    }

    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }
}

module.exports = Client;