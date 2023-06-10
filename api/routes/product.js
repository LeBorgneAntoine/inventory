const { isCompanyContainUser } = require('../DAO/DAO.security.util');
const { getAllFieldsOfCategory, getAllFieldsOfCategoryID, getAllLegacyFieldsOfCategoryID } = require('../DAO/DAO.Field');
const { updateProduct, getProductByID } = require('../DAO/DAO.Product');
const { addProduct, getAllProductsByCompanyIDAndCategoryID } = require('../DAO/DAO.Product');
const Product = require('../model/model.Product');
const { requireBody, requireParam } = require('../utils/utils.request');
const path = require('path');
const { saveImageBase64, saveImageFile } = require('../utils/utils.storage');

const router = require('express').Router();



router.get('/all', async (req, res) => {
    try{

        let { company, category } = requireParam(req, ['company'])

        if(!await isCompanyContainUser(company, req.user))throw new Error('Unauthorize company access')

        let products = await getAllProductsByCompanyIDAndCategoryID(company.id, category?.id ?? null)
        
        res.send(products)

    }catch(err){ 
        console.log(err)
        res.sendStatus(500)
    }
    

})


router.get('/', async (req, res) => {

    try{

        let { company, category } = requireParam(req, ['company'])

        let products = await getAllProductsByCompanyIDAndCategoryID(company.id, category?.id ?? null)

        res.send(products)

    }catch(err){ 
        console.log(err)
        res.sendStatus(500)
    }
})

router.get('/image/:productID', async (req, res) => {

    try{

        let id = req.params.productID

        let product = await getProductByID(id);

        await isCompanyContainUser(product.getCompanyID(), req.user.getID())

        if(product.getImage()){

            let imageFile = require('path').join(__dirname, '../../')+'api\\images\\'+product.getImage()

            res.sendFile(imageFile)

        }else{
            res.sendStatus(404)
        }


    }catch(err){ 
        console.log(err)
        res.sendStatus(401)
    }
})


router.post('/', async (req, res) => {
    try{

        let { name, company, category, image } = requireBody(req, ['name', 'company'])
        
        let insertedProduct = await addProduct(new Product({
            name,
            companyID: company.id,
            categoryID: category?.id ?? null,
            image
        }))

        res.sendStatus(200)

    }catch(err){ 
        console.log(err)
        res.sendStatus(500)
     }
})

router.post('/image', async (req, res) => {

    try{


        if(req.files){
            let file = req.files.image

            let fileName = await saveImageFile(file)
    
            res.send(fileName)
        }else{
            throw new Error('no file')
        }

       

    }catch(err){ 
        console.log(err)
        res.sendStatus(500)
     }

})


router.get('/fields', async (req, res) => {
    try{

        let { category } = requireParam(req, ['category'])

        let fields = await getAllLegacyFieldsOfCategoryID(category.id)

        res.send(fields)

    }catch(err){ 
        console.log(err)
        res.sendStatus(500)
    }

})


router.put('/', async (req ,res) => {

    try{

        let product = new Product(requireBody(req, ['id']))
            
        await updateProduct(product)

        res.sendStatus(200)

    }catch(err){ 
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router