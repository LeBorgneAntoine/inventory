const { getAllFieldsOfCategory, getAllFieldsOfCategoryID, getAllLegacyFieldsOfCategoryID } = require('../DAO/DAO.Field');
const { updateProduct } = require('../DAO/DAO.Product');
const { addProduct, getAllProductsByCompanyIDAndCategoryID } = require('../DAO/DAO.Product');
const Product = require('../model/model.Product');
const { requireBody, requireParam } = require('../utils/utils.request');

const router = require('express').Router();



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


router.post('/', async (req, res) => {
    try{

        let { name, company, category } = requireBody(req, ['name', 'company'])


        let insertedProduct = await addProduct(new Product({
            name,
            companyID: company.id,
            categoryID: category?.id ?? null
        }))

        res.sendStatus(200)

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