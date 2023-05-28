const { addCompany  } = require('../DAO/DAO.Company');
const { addEmployee, getAllCompanyByUser } = require('../DAO/DAO.Employee');
const Company = require('../model/model.Company');
const { requireBody } = require('../utils/utils.request');
const fs = require('fs');
const { decodeBase64Image } = require('../utils/utils.string');
const { File } = require('buffer');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = require('express').Router();

/**
 * Create a company and specified it's owner in the employee table.
 */
router.post('/', async (req ,res) => {

    try{

        let { name, logo, description } = requireBody(req, ['name'])
        
        let company = new Company({
            name,
            logo,
            description
        })

        let insertedCompany = await addCompany(company)

        let user = req.user; //get the user request 

        await addEmployee(user, 'OWNER', insertedCompany)

        res.sendStatus(200)

    }catch(err){
        
        res.status(400).send(err)
    }

})



router.post('/logo',upload.single('logo'), async (req ,res) => {

    try{

        //if    (!picture)throw new Error('Missing picture')

        console.log(req.file)

        //console.log(req.files)
        //fs.writeFileSync('test', picture)


        res.sendStatus(200)

    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }

})

/**
 * Get all the company of a user
 */
router.get('/', async (req ,res) => {

    let user = req.user;

    let companies = await getAllCompanyByUser(user);

    res.send(companies.map((company) => company._data))

})



module.exports = router;