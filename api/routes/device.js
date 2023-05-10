const Folder = require('../model/model.Folder');
const Reference = require('../model/model.Reference');
const { getAllConnectedDevices } = require('../model/model.User');

const router = require('express').Router();


router.get('/', (req, res) => {

    let {user} = req.body

    res.send(getAllConnectedDevices().map((val) => val.getName()))

})  




module.exports = router