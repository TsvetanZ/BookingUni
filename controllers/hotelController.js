const hotelController = require('express').Router();

hotelController.get('/:id/details', (req, res) =>{
    res.render('details', {
        title: 'Hotel Details',
        
    })
});

hotelController.get('/create', (req, res) =>{
    res.render('create', {
        title: 'Hotel Create',
        
    })
});


hotelController.get('/:id/edit', (req, res) =>{
    res.render('edit', {
        title: 'Hotel Edit',
    })
});

module.exports = hotelController;