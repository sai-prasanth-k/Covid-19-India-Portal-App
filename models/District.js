const mongoose = require('mongoose');
const {Schema, model} = mongoose();
const DistrictSchema = Schema({
    districtName: {
        type: String,
        required: true,
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
    cases: {
        type: Number,
        required: true,
    },
    cured: {
        type: Number,
        required: true,
    },
    active: {
        type: Number,
        required: true,
    },
    deaths: {
        type: Number,
        required: true,
    }
});

module.exports = model('District', DistrictSchema);