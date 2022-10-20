const {Schema, model} = require('mongoose');

//TODO add User properties list and validation according to assigment
const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: [3, 'Username must be at last 3 characters']}, //  "unique: true" work only there is index(userSchema.index)
    hashedPassword: {type: String, required:  true},
});

userSchema.index ({username: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

