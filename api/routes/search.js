const { requireParam } = require('../utils/utils.request');

const router = require('express').Router();


router.get('/', (req, res) => {

    let { query, company } = requireParam(req, ['query', 'company'])

    let results = [];

    

})



module.exports = router