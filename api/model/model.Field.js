

class Field{

    _data;

    constructor({
        id,
        forObject,
        linkID,
        type,
        value,
        name
    }){

        this._data = {
            forObject,
            linkID,
            type,
            value,
            name,
            id,
        }

    }

    /**
     * 
     * @returns {Number}
     */
    getCategoryID(){
        return this._data.categoryID
    }

    /**
     * 
     * @returns {Number}
     */
    getID(){
        return this._data.id
    }

    getLinkID(){
        return this._data.linkID
    }

    getForObject(){
        return this._data.forObject
    }

    /**
     * 
     * @returns {String}
     */
    getType(){
        return this._data.type
    }

    /**
     * 
     * @returns {String}
     */
    getValue(){
        return this._data.value
    }

    /**
     * 
     * @returns {String}
     */
    getName(){
        return this._data.name
    }

    /**
     * 
     * @param {String} params 
     * @returns {Array}
     */
    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }

}

module.exports = Field;