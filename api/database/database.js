const sqlite3 = require('sqlite3').verbose();
const { readFileSync } = require('fs');

class DatabaseHelper{
    
    _db;

    constructor(){

    }

    openDatabase(databasePath){
        this._db = new sqlite3.Database(databasePath);
    }

    /**
     * 
     * @returns {import('sqlite3').Database}
     */
    query(){
        
        return this._db
    }

    setup(){
        return new DatabaseSetup(this._db)
    }

}

class DatabaseSetup{

    _db;

    constructor(db){
        this._db = db
    }



    script(fileName){

        let dataSql = readFileSync(fileName).toString();

        let dataArr = dataSql.toString().split(');');

        this._db.serialize(() => {

            this._db.run('PRAGMA foreign_keys=OFF;');
            this._db.run('BEGIN TRANSACTION;');
   
            dataArr.forEach((query) => {
                
              if(query) {

                query += ');';
                

                this._db.run(query, (err) => {
                   if(err) throw new Error('for: '+query+'\n'+err);
                });
              }
            });
            this._db.run('COMMIT;');
        });

        return this;
    }   
    
}


let databaseHelper;

/**
 * 
 * @returns {DatabaseHelper}
 */
function getDatabaseHelperInstance(){

    if(!databaseHelper)databaseHelper = new DatabaseHelper()
    return databaseHelper

}

module.exports = {
    getDatabaseHelperInstance
}