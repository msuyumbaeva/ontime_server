const mongoose =require('mongoose');

const actionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    device: {type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true},
    planPeriod: {type: Number, required: true},
    planStopDate: Date, 
    factPeriod: Number,   
    stoppedDate: Date,
    pauses: [{
        _id: mongoose.Schema.Types.ObjectId,
        pauseTime: Date,
        passedTime: Number,
        duration: Number,
        remainTime: Date,
        leftTime: Number
    }],
    createdDate: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Action', actionSchema);