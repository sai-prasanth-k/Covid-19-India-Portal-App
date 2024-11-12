const express = require('express');
const State = require('../models/State');
const {authenticationToken} = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticationToken, async(request, response) => {
    const states = await State.find();
    response.send(states);
});

router.get('/:stateId', authenticationToken, async(request, response) => {
    const {stateId} = request.params;
    const state = await State.findById(stateId);
    if(!state) {
        return response.status(400).send('State not found');
    }
    response.send(state);
});

module.exports = router;