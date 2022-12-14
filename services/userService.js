const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'q34545njnjhjkhuhui';

async function register (email, username, password) {
    const existingEmail = await User.findOne({ email }).collation({locale: 'en', strength: 2 });
    if (existingEmail ) {
        throw new Error('Email is taken')
    }

    const existing = await User.findOne({ username}).collation({locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    // TODO  see assigment if registration creates user session
    const token = createSession(user);

    return token;
}

async function login (email, password) {
    //console.log(email)
    const user = await User.findOne({ email }).collation({locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorect email or password')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
   if (!hasMatch) {
    throw new Error('Incorect username or password123');
   }
 
    return createSession(user);
}

function createSession({_id, email, username}) {
    const payload = {
        _id,
        email,
        username // трябва да видя как да го напряв колко време да payload oъ Иво стари уроци
    };

    return jwt.sign(payload, JWT_SECRET);
}

 function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken,
};