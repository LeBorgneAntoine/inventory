
const { getAllConnectedDevices, renameDevice } = require('../model/model.Device');

const router = require('express').Router();


router.get('/', (req, res) => {

    res.send(getAllConnectedDevices().map((val) => val.getName()))

})

router.post('/rename', (req, res) => {

    let { name, current } = req.body

    if(name && current){

        if(renameDevice(current, name)){

            console.log('Device',current,'renamed to',name)

            res.sendStatus(200)

        }else{

            res.status(401).send('Ce nom d\'appareil est déjà utilisé')

        }


        
    }else{
        res.status(401).send('3 charactère ou plus')
    }



})  






module.exports = router