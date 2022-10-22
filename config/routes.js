const autController = require("../controllers/authController");
const homeController = require("../controllers/homecontroller");
const hotelController = require("../controllers/hotelController");
const profileController = require("../controllers/profileConroller");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', autController);
    app.use('/hotel', hotelController);
    app.use('/profile', profileController);


};

 