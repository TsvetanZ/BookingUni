const autController = require("../controllers/authController");
const homeController = require("../controllers/homecontroller");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', autController);


};

 