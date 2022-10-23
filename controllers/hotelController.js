const { create, getById, update, deleteHotelById, bookRooom } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();

hotelController.get('/:id/details', async (req, res) =>{
    const hotel =await getById(req.params.id);

    if(hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if(hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())){
        hotel.isBooked = true;
    }
    res.render('details', {
        title: 'Hotel Details',
        hotel
    });
});

hotelController.get('/create', (req, res) =>{
    res.render('create', {
        title: 'Hotel Create',
        
    })
});

hotelController.post( '/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id,
    };

    
    try {
        if(Object.values(hotel).some(v=> !v)){
            throw new Error('All feilds are required')
        }
        const result = create(hotel);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
           title: 'Create hotel',
            body: hotel ,
            errors:parseError(error)
        });
       
    }
})


hotelController.get('/:id/edit', async(req, res) =>{
    const hotel =await getById(req.params.id);
    if(hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    
    console.log(hotel)
    res.render('edit', {
        title: 'Hotel Edit',
        hotel
    })
});

hotelController.post('/:id/edit', async(req, res) =>{
    const hotel =await getById(req.params.id);

    if(hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }

    const editHotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
    };
    console.log(editHotel)

    try {
        if(Object.values(editHotel).some(v=> !v)){
            throw new Error('All feilds are required')
        }
        const result = update(req.params.id, editHotel);
        res.redirect(`/hotel/${req.params.id}/details`);
    } catch (error) {
        res.render('edit', {
           title: 'Edit hotel',
            hotel: Object.assign(editHotel, {_id:req.params.id}) ,
            errors:parseError(error)
        });  
    }
});

hotelController.get('/:id/delete', async(req, res) =>{
    const hotel =await getById(req.params.id);
    if(hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    await deleteHotelById(req.params.id)
    res.redirect('/')
});

hotelController.get('/:id/book', async(req, res) =>{
    const hotel =await getById(req.params.id);

    try{
    if(hotel.owner == req.user._id) {
        hotel.isOwner = true;
        throw new Error('Cannot book your own hotel');
    }

    await bookRooom(req.params.id, req.user._id);
    res.redirect(`/hotel/${req.params.id}/details`);
    }catch(err) {
        res.render('details', {
            titile: 'Hotel details',
            hotel,
            errors: parseError(err)
        })

    }

});

module.exports = hotelController;