
/**
 * @author LeBorgneAntoine
 * @version 1.0.0
 * 
 * Product POJO object
 */
class Product{

    _data;

    constructor({
        categoryID,
        companyID,
        name,
        image,
        id,
    }){
        this._data = {
            categoryID,
            companyID,
            name,
            image,
            id,
        }
    }

    getID(){
        return this._data.id
    }

    /**
     * 
     * @returns {String}
     */
    getName(){
        return this._data.name;
    }

    /**
     * 
     * @returns {String}
     */
    getImage(){
        return this._data.image;
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
    getCompanyID(){
        return this._data.companyID
    }

    /**
     * 
     * @returns {Array}
     */
    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }

}

module.exports = Product;
