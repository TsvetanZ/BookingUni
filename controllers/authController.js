const validator = require ('validator');
const {register, login} = require('../services/userService');
const { parseError } = require('../util/parser');

const autController = require('express').Router();


autController.get('/register', (req, res) =>{
    //TODO replace with actul view
    res.render('register', {
        title: 'Register Page'
    });
});

autController.post ('/register', async(req, res) =>{
    try {
        if(validator.default.isEmail(req.body.email) == false){
            throw new Error('Invalid email')
        }
        if(req.body.username == ''|| req.body.password =='') {
            throw new Error('All fields are required')
        }
        if(req.body.password.length < 5) {
            throw new Error ('Password must be at least 5 charters long');
        }
        if(req.body.password != req.body.repass) {
            throw new Error ('Password don\'t match');
        }
    const token = await register(req.body.email, req.body.username, req.body.password);

    // TODO CHECK assignment to see if register create session
    res.cookie('token', token);
    res.redirect('/'); //TODO replace with redirect by assignment
    //TODO add error display to actual templete assignment
    }catch (error) {
        //TODO add error parser
        const errors = parseError(error)
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email,
                username: req.body.username                
            }
        }); 

    }
});

autController.get('/login', (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
})

autController.post('/login', async (req,res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //TODO replace with redirect by assignment
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                email : req.body.email
            }
        });
    }
});

autController.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = autController;