const mongoose =require('mongoose');

const deviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    createdDate: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Device', deviceSchema);