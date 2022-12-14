const {Schema, model} = require('mongoose');

//TODO add User properties list and validation according to assigment
const userSchema = new Schema({
    email: {type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/i, 'Email may contain only english letter and numbers' ]
    },
    username: {type: String,
         required: true,
          unique: true,
          minlength: [3, 'Username must be at last 3 characters'],
          match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letter and numbers']
        },  
    hashedPassword: {type: String, required:  true}
});

userSchema.index ({email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index ({username: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;



