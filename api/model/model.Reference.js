
class Reference{

    _data;

    constructor({
        id,
        code,
        vendorName,
        comment,
        productID,
    }){
        this._data = {
            code,
            vendorName,
            comment,
            productID,
            id
        }
    }

    /**
     * 
     * @returns {String}
     */
    getCode(){
        return this._data.code
    }
    /**
     * 
     * @returns {String}
     */
    getVendorName(){
        return this._data.vendorName
    }
    /**
     * 
     * @returns {String}
     */
    getComment(){
        return this._data.comment
    }
    /**
     * 
     * @returns {NUmber}
     */
    getProductID(){
        return this._data.productID
    }

}

module.exports = Reference