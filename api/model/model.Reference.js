const { setter } = require("./model");

let listeners = [];

function modifyListener(func){
    listeners.push(func)
}

function notify(passData){
    for(let func of listeners)func(passData)
}

/**
 * @author LeBorgneAntoine
 * @version 1.0.0
 * 
 * Reference POJO object
 */
class Reference{

    _data;

    constructor({
        ref,
        name,
        comment,
        image,
        folder,
        quantity,
        id,
    }){
        this._data = {
            ref,
            name,
            comment,
            image,
            folder,
            quantity,
            id,
        }
    }

    getID(){
        return this._data.id
    }

    getRef(){
        return this._data.ref;
    }

    getName(){
        return this._data.name;
    }

    getComment(){
        return this._data.comment;
    }

    getImage(){
        return this._data.image;
    }

    getFolder(){
        return this._data.folder
    }

    getQuantity(){
        return this._data.quantity
    }

    // --- setter
    setRef(newValue){
        setter(this._data, 'ref', newValue, notify, this)
    }

    setName(newValue){
        setter(this._data, 'name', newValue, notify, this)
    }

    setComment(newValue){
        setter(this._data, 'comment', newValue, notify, this)
    }

    setImage(newValue){
        setter(this._data, 'image', newValue, notify, this)
    }

    setFolder(newValue){
        setter(this._data, 'folder', newValue, notify, this)
    }

    setQuantity(newValue){
        setter(this._data, 'quantity', newValue, notify, this)
    }

    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }

}

module.exports = Reference;
