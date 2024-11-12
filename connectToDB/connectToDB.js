const express = require('express')
const mongoose = require('mongoose');
const path = require('path');

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
}