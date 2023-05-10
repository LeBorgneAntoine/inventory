const { getAllFolders, addFolder, deleteFolder } = require('../DAO/DAO.Folder');
const { getAllReferences, addReference, deleteReference } = require('../DAO/DAO.References');
const Folder = require('../model/model.Folder');
const Reference = require('../model/model.Reference');

const router = require('express').Router();

router.post('/reference', (req, res , next) => {
    let reference =  req.body;
    addReference(new Reference(reference))
    res.sendStatus(200)
})

router.post('/folder', (req, res , next) => {
    let folder =  req.body;
    if(!folder){
        res.sendStatus(502)
        return;
    }
    addFolder(new Folder(folder))
    res.sendStatus(200)
})

router.delete('/reference', () => {
    let reference =  req.body;
    deleteReference(new Reference(reference))
    res.sendStatus(200)
})

router.delete('/folder', () => {
    let folder =  req.body;
    deleteFolder(new Folder(folder))
    res.sendStatus(200)
})

router.get('/', async (req, res, next) => {
    res.send({
        folders: await getAllFolders(),
        references: await getAllReferences()
    })
})

router.get('/references', async (req, res, next) => {
    res.send(await getAllReferences())
})

router.get('/folders', async (req, res, next) => {
    res.send(await getAllFolders())
})


module.exports = router

