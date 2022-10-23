const autController = require("../controllers/authController");
const homeController = require("../controllers/homecontroller");
const hotelController = require("../controllers/hotelController");
const profileController = require("../controllers/profileConroller");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', autController);
    app.use('/hotel', hasUser(), hotelController);
    app.use('/profile', profileController);

    //app.use((err, req, res, next) => {
    //    console.log('Global error handing')
    //    console.log(err.massage);
    //    res.redirect('/');
//
    //});


};

 