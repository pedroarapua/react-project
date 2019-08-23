const mongoose = require('mongoose');

const profileList = new mongoose.Schema({
    name: String,
    favoriteHeroes:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Profile', profileList);