const mongoose = require('mongoose');
const Action = require('../models/Action');
const User = require('../models/User');

module.exports.getAll = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id).select('name');
    const today = new Date();
    Action.find({user: id,createdDate: { $gte: new Date(today - 24*3600*1000) }})                  
        .populate('device', '_id name')
        .populate('user', '_id name')
        .sort('-createdDate')
        .exec()
        .then(acts => {
            const response = {
                count: acts.length,
                user,
                actions: acts
            };
            return res.status(200).json(response);
        })
        .catch(err => {
            onsole.log(err);
            return res.status(500).json({error: err});
        });
}

module.exports.start = (req,res) =>{
    const action = new Action({
        _id: new mongoose.Types.ObjectId(),
        user: req.userData.user_id,
        device: req.body.device,
        planPeriod: req.body.planPeriod,
        createdDate: new Date(req.body.createdDate).getTime() + 6 * 60 * 60 * 1000,
        planStopDate: req.body.planStopDate  + 6 * 60 * 60 * 1000
    });
    action
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Action created successfully',
                actionId: result._id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

module.exports.pause = (req,res) =>{
    const id = req.body.id;
    Action.findById(id)
    .exec()
    .then(action=>{
        action.pauses.push({
            _id: new mongoose.Types.ObjectId(),
            passedTime: req.body.passedTime,
            pauseTime: req.body.pauseTime + 6 * 60 * 60 * 1000
        })
        action
            .save()
            .then(result => {
                res.status(201).json({
                    message: 'Action pause created successfully',
                    pauseId: result.pauses[result.pauses.length-1]._id
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
}

module.exports.remain = (req,res) =>{
    const id = req.body.id;
    const pid = req.body.pid;
    Action.findById(id)
    .exec()
    .then(action=>{
        const i = action.pauses.findIndex(p=>{
            return p._id == pid;
        })
        if(i>=0){
            action.pauses[i].remainTime = req.body.remainTime + 6 * 60 * 60 * 1000;
            action.pauses[i].leftTime = req.body.leftTime;
            action.planStopDate = req.body.planStopDate + 6 * 60 * 60 * 1000;
            action.pauses[i].duration = parseInt((action.pauses[i].remainTime - action.pauses[i].pauseTime)/1000);
            action
            .save()
            .then(() => {
                res.status(201).json({
                    message: 'Action remain created successfully'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        } 
        else 
            res.status(404).json({error: `Action pause with id ${pid} was not found`});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });  
}

module.exports.stop = (req,res) =>{
    const id = req.body.id;
    Action.findById(id)
    .exec()
    .then(action=>{
        action.factPeriod = req.body.factPeriod;
        action.stoppedDate = req.body.stoppedDate + 6 * 60 * 60 * 1000;
        action
            .save()
            .then(() => {
                res.status(201).json({
                    message: 'Action stop created successfully'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    }); 
}

module.exports.delete = (req,res) =>{
    const id = req.params.id;
    Action.findByIdAndDelete(id)
    .exec()
    .then(()=>{
        res.status(200).json({
            message: 'Action deleted successfully'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    }); 
}

