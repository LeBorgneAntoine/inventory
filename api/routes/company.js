const { addCompany, getCompanyByID  } = require('../DAO/DAO.Company');
const { addEmployee, getAllCompanyByUser } = require('../DAO/DAO.Employee');
const Company = require('../model/model.Company');
const { requireBody, requireParam } = require('../utils/utils.request');
const fs = require('fs');
const { decodeBase64Image } = require('../utils/utils.string');
const { File } = require('buffer');
const multer  = require('multer');
const { isCompanyContainUser } = require('../DAO/DAO.security.util');
const { saveImageFile } = require('../utils/utils.storage');

const upload = multer({ dest: 'uploads/' })

const router = require('express').Router();

/**
 * Create a company and specified it's owner in the employee table.
 */
router.post('/', async (req ,res) => {

    try{

        let { name, logo } = requireBody(req, ['name'])
        
        let company = new Company({
            name,
            logoURL
        })

        let insertedCompany = await addCompany(company)

        let user = req.user; //get the user request 

        await addEmployee(user, 'OWNER', insertedCompany)

        res.sendStatus(200)

    }catch(err){
        
        res.status(400).send(err)
    }

})

router.get('/info', async (req, res) => {
    try{

        let { company } = requireBody(req, ['company'])

        if(!await isCompanyContainUser(company, req.user.getID()))throw new Error('Unauthorize company access')
        
        let companyObj = await getCompanyByID(company)

        res.send(companyObj._data)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }   
})


router.post('/logo', async (req ,res) => {

    try{

        if(!req.files?.image)throw new Error('No image')

        let fileName = await saveImageFile(req.files.image)
        res.send(fileName)

    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }

})


router.get('/logo', async (req ,res) => {

    try{
        let { company } = requireParam(req, ['company'])

        let user = req.user;

        if(!isCompanyContainUser(company, user.getID()))return res.sendStatus(401)
    
        let companyObj = await getCompanyByID(company)

        let imageFile = require('path').join(__dirname, '../../')+'api\\images\\'+companyObj.getLogoURL()

        res.sendFile(imageFile)

    }catch(err){

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