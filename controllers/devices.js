const mongoose = require('mongoose');
const Device = require('../models/Device');

module.exports.getAll = (req,res) => {
    Device.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                devices: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

module.exports.create = (req,res) =>{
    const device = new Device({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        createdDate: new Date()
    });
    device.createdDate = device.createdDate.getTime() + 6 * 60 * 60 * 1000;
    device
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Device created successfully',
                device: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}