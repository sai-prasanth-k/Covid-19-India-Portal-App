const mongoose = require('mongoose');
const {Schema, model} = mongoose()
const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

module.exports = model('User', UserSchema)