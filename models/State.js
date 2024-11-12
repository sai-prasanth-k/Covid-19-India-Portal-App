const mongoose = require('mongoose');
const {Schema, model} = mongoose();

const StateSchema = Schema({
    stateName: {
        type: String,
        required: true,
    },
    population: {
        type: Number,
        required: true,
    }
});

module.exports = model('State', StateSchema);