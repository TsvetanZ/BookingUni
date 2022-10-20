const homeController = require('express').Router();


// TODO replace whit real controller by assigment
homeController.get('/', (req, res) => {
    res.render('home', {
        title:'Home page',
        user: req.user
    });
});

module.exports = homeController;