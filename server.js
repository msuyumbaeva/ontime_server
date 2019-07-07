const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.app_port || 3000;
const app = express();

const userRoutes = require('./routes/users');
const deviceRoutes = require('./routes/devices');
const actionRoutes = require('./routes/actions');

mongoose.connect('mongodb+srv://admin:admin527270@cluster0-kzjur.mongodb.net/ontime?retryWrites=true',
{
    useNewUrlParser: true
});

app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use('/devices', deviceRoutes);
app.use('/actions', actionRoutes);

app.listen(port,()=>console.log(`Server started on port ${port}`));