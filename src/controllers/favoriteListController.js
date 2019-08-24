const Favorites = require('../models/favoriteList');

module.exports = {
    async index(req, res){
        const favorite = await Favorites.find({}).sort('name');

        return res.json(favorite);
    },
    async store(req, res){
        const storeFavorite = await Favorites.findById(req.params.id);
        storeFavorite.set({favoriteHeroes: 1});


        return res.json(storeFavorite);
    }
}