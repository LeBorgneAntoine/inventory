const User = require('../model/model.User');
const { compareHash, hashPassword } = require('../utils/utils.password');
const jwt = require('jsonwebtoken');
const { requireBody } = require('../utils/utils.request');
const router = require('express').Router();
const validator = require('validator').default;

router.post('/login', async (req, res) => {

    try{

        let {username, password} = requireBody(req, ['username', 'password'])

        let user = validator.isEmail(username) ? await getUserByEmail(username) : await getUserByUsername(username);

        if(!compareHash(password, user.getPassword()))throw new Error()

        let token = jwt.sign({ userID : user.getID() }, process.env.JWT_SECRET, {algorithm: 'HS256'})

        res.send({
            name: user.getName(),
            token,
        })

    }catch(err){
        console.log(err)
        res.status(401).send('LOGIN_FAIL');

    }

   

})


router.post('/register', async (req, res) => {

    try{

        let { name, username, email, password } = requireBody(req, ['name', 'username', 'password', 'email']);

        if(!validator.isEmail(email))throw new Error('Wrong email format');

        let user = new User({name, username, email, password: await hashPassword(password), access: 'OWNER'})

        await addUser(user);

        res.sendStatus(200);

    }catch(err){

        res.status(400).send(err)

    }


})

router.post('/activate-account', async (req, res) => {



})

router.get('my-access', (req, res) => {

})



module.exports = router