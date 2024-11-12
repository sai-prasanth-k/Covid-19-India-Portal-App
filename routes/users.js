const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
router.post = ('/register', async (request, response) => {
    const {username, password} = request.body;
    const existingUser = await User.findOne({username});
    if(existingUser) {
        return response.status(400).send('User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword
    })
    await newUser.save();

    response.send('Created Account');
})

router.post('/login', async (request, response) => {
    const {username, password} = request.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) {
        return response.status(400).send("Invalid user");
    }

    const validatePassword = await bcrypt.compare(password, userDoc.password);
    if (!validatePassword) {
        return response.status(400).send("Invalid Password");
    }

    const payload = {username};
    const token = jwt.sign(payload, "MY_SECRET_KEY");
    response.send({jwtToken: token});
});

module.exports = router;