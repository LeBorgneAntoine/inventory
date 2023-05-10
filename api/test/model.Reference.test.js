
const Reference = require("../model/model.Reference");
const { addReference, getAllReferences, updateReference, deleteReference, deleteAllReference, deleteAllReferences } = require("../DAO/DAO.References");
const { getDatabaseHelperInstance } = require("../DAO/database");

getDatabaseHelperInstance().openDatabase('./DAO/database.db')
getDatabaseHelperInstance().setup().script('./DAO/scripts/createTables.sql')


let temp = new Reference({
    id: 12,
    ref: 'test',
    comment: 'test_com',
    folder: 3,
    image: 'another_path',
    name: 'test_name',
    quantity: 42
})
