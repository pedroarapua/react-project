const mongoose = require('mongoose');

const FavoriteListSchema = new mongoose.Schema({
    name: String,
    favoriteHeroes:{
        type: [Number],
        default: 0
    }
});

module.exports = mongoose.model('favoriteList', FavoriteListSchema);