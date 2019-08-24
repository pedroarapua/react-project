const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://rp-profile-base:abc123456@rp-profile-base-nt0xf.mongodb.net/test?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true
    }
);

app.use(express.json());
app.use(require('./routes'));

app.get('/', (req, res) =>{
    return res.send('hello word');
});

