const { getFolderByID, addFolder, updateFolder, deleteFolder } = require("../DAO/DAO.Folder");
const { getDatabaseHelperInstance } = require("../DAO/database");
const Folder = require("../model/model.Folder");

getDatabaseHelperInstance().openDatabase('./DAO/database.db')
getDatabaseHelperInstance().setup().script('./DAO/scripts/createTables.sql')
