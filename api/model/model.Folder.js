
class Folder{

    _data;
    _isLive = false;

    constructor({
        id,
        name,
        parent
    }){
        this._data = {
            name,
            parent,
            id,
        } 
    }

    getID(){
        return this._data.id
    }

    getName(){
        return this._data.name
    }

    getParent(){
        return this._data.parent
    }

    setName(newValue){
        this._data.name = newValue;
    }

    setParent(newValue){
        this._data.parent = newValue;
    }

    toArray(params){
        return Object.keys(this._data).filter((val) => !params || !params.includes('-'+val) ).map((val) => this._data[val])
    }
}

module.exports = Folder;