const express = require('express');
const District = require('../models/District');
const {authenticationToken} = require('../middleware/auth');
const { match } = require('assert');

const router = express.Router();

router.post('/', authenticationToken, async(request, response) => {
    const {districtName, stateId, cases, cures, active, deaths} = request.body;
    const district = new District({
        districtName,
        stateId,
        cases,
        cures,
        active,
        deaths,
    });
    await district.save();
    response.send('District Successfully Added');
});

router.get('/:districtId', authenticationToken, async(request, response) => {
    const {districtId} = request.params;
    const districtDocs = District.findById(districtId).populate('stateId');
    if(!district) {
        return response.status(404).send('District not found');
    }
    response.send(districtDocs);
});

router.delete('/:districtId', authenticationToken, async (request, response)=>{
    const {districtId} = request.params;
    await District.findByIdAndDelete(districtId);
    response.send('District Removed');
});

router.put('/:districtId', authenticationToken, async (request, response) => {
    const {districtId} = request.params;
    const {districtName, stateId, cases, cured, active, deaths} = request.body;
    await District.findByIdAndUpdate(districtId, {
        districtName,
        stateId,
        cases,
        cured,
        active,
        deaths,
    });
    response.send('District Details Updated');
});

router.get('/:stateId/stats', authenticationToken, async (request, response) => {
    const {stateId} = request.params;
    const stats = await District.aggregate([
        {
            $match: {
                stateId: mongoose.Types.ObjectId(stateId),
            }
        },
        {
            $group: {
                _id: '$stateId',
                totalCases: { $sum: '$cases'},
                totalCured: { $sum: '${cured}'},
                totalActive: { $sum: '$active'},
                totalDeaths: { $sum: '$deaths'}
            }
        }
    ]);
    response.send(stats[0]);
});

module.exports = router;