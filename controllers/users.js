const mongoose = require('mongoose');
const User = require('../models/User');
const md5 = require('md5');
const jwt    = require('jsonwebtoken');

module.exports.getAll = (req,res) => {
    User.find()
        .sort('name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

module.exports.create = (req,res) =>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: md5(req.body.password),
        role: req.body.role,
        createdDate: new Date()
    });
    user.createdDate = user.createdDate.getTime() + 6 * 60 * 60 * 1000;
    user
        .save()
        .then(result => {
            res.status(201).json({
                message: 'User created successfully',
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

module.exports.auth = (req,res) => {
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({name: name, password: md5(password)})
        .exec()
        .then(docs => {
            if(docs)
                res.status(200).json({
                    token: generateToken(docs)
                });
            else
                res.status(200).json({error: "Неверный логин или пароль"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

const generateToken = (user) => {
    return jwt.sign({ login: user.name, role:user.role, user_id:user._id}, "sanjaralmaz", { expiresIn: "1d" })
};