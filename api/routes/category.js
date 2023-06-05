const { addCategory, getAllCategoriesByCompany, getAllCategoriesByCompanyID, getAllCategoriesByCompanyIDAndParentID } = require('../DAO/DAO.Category');
const { addField, addFieldFor } = require('../DAO/DAO.Field');
const { getAllProductsByCompanyIDAndCategoryID } = require('../DAO/DAO.Product');
const Category = require('../model/model.Category');
const Field = require('../model/model.Field');
const { requireBody, requireParam, safe } = require('../utils/utils.request');

const router = require('express').Router();


router.post('/', async (req, res) => {

    try{

        let { name, fields, parent, company } = requireBody(req, ['name', 'company'])

        let category = await addCategory(new Category({
            name,
            parentID: parent,
            companyID: company.id
        }))
    
        if(fields)for(let field of fields){
    
            await addFieldFor(new Field({
                forObject: 'CATEGORY',
                linkID: category.getID(),
                name: field.value,
            }))
    
        }
    
        res.sendStatus(200)

    }catch(err){
        res.sendStatus(500)
    }


})


router.get('/', async (req, res) => {

    try{
        let { company, parent } = requireParam(req, ['company'])
        
        let categories = await getAllCategoriesByCompanyIDAndParentID(company.id, parent?.id ?? null)


        for(let category of categories){

            let products = await getAllProductsByCompanyIDAndCategoryID(company.id, category.id)

            category.productsQuantity = products.length

        }

        res.send(categories)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

})




module.exports = router