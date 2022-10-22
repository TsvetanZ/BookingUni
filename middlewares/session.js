const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        console.log(token);
        try {
          const userData = verifyToken(token);
          req.user = userData;
          res.locals.username = userData.username;   // по този начин го вкарваме в глобалния контекс с res.locals - това го чете тамплеита
          //console.log('Read successul, user', userData.username);
          req.user = userData;

        } catch (error) {
            //console.log('Invalid token');
            res.clearCookie('token'); // изчистваме кокито и в сгобите казваме кое е то;
            res.redirect('/auth/login');
            return
        }
        
    }

    next();
}