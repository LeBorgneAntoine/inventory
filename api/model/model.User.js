

class User{

    _data;

    constructor({
        id,
        username,
        password,
        name,
        email
    }){
        this._data = {
            username,
            password,
            name,
            email,
            id,
        }
    }

    /**
     * 
     * @returns {number}
     */
    getID(){
        return this._data.id
    }

    /**
     * @returns {String}
     */
    getUsername(){
        return this._data.username
    }

    /**
     * @returns {String}
     */
    getPassword(){
        return this._data.password
    }

    /**
     * @returns {String}
     */
    getName(){
        return this._data.name
    }

    /**
     * @returns {String}
     */
    getEmail(){
        return this._data.email
    }


    /**
     * @returns {Array}
     */
    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }

}

module.exports = User