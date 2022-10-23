const { getAll } = require('../services/hotelService');

const homeController = require('express').Router();


// TODO replace whit real controller by assigment
homeController.get('/', async (req, res) => {
    const hotels = await getAll();
    res.render('home', {
        title:'Home page',
        hotels
        //user: req.user само за тестовете е нужно
    });
});

module.exports = homeController;