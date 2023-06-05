const { getUserByID } = require("../DAO/DAO.User");
const jwt = require('jsonwebtoken');

/**
 * check if the required body attribute are presents.
 * if not an error is raised.
 * 
 * @param {import("express").Request} req incoming request object
 * @param {Array<String>} attribute an array of attributes keys names 
 * @returns {JSON} request body object
 */
function requireBody(req, attribute){

    for(let data of attribute){
        if(!req.body[data])throw new Error('Missing '+data+' !')
    }
   
    return req.body;

}


/**
 * check if the required query attribute are presents.
 * if not an error is raised.
 * 
 * @param {import("express").Request} req incoming request object
 * @param {Array<String>} queries an array of attributes keys names
 * @returns {JSON} request query object
 */
function requireParam(req, queries){

    for(let data of queries){
        if(!req.query[data])throw new Error('Missing '+data+' !')
    }
   
    return req.query;

}


/**
 * Express middleware path.
 * Check the Authorization header for bearer token.
 * Authorize Authorization header format:
 * "Authorization" : "Bearer [Token]"
 * 
 * @param {import("express").Request} req incoming request object
 * @param {import("express").Response} res response object
 * @param {Function} next callback function to next route
 */
async function secure(req, res, next){

    let { authorization }  = req.headers ?? null;

    try{

        if(!authorization)throw new Error('Authorization header is not set.')

        //Remove "Bearer" from token string "Bearer <token>"
        let token = authorization.split(' ')[1];

        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        let user = await getUserByID(decodedToken.userID)

        if(!user)throw new Error('Unkow user by ID: '+decodedToken.userID)

        //set an easy access to the User object
        req.user = user;

        next();

    }catch(err){
        //show error on console for dev
        console.err(err)
        res.sendStatus(401);
    }

}


async function checkIsMyCompany(req, res, next){

    let  bodyCompany  = req.body.company;
    let  queryCompany  = req.query.company;
    let user = req.user

    try{

        if(!bodyCompany || !queryCompany)throw new Error('need company id')

        



    }catch(err){
        console.log(err)
        res.sendStatus(401)
    }

}

module.exports = {
    requireBody,
    requireParam,
    secure,
    checkIsMyCompany
}