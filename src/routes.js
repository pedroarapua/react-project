const express = require('express');
const routes = express.Router();
const favoriteListController = require('./controllers/favoriteListController');

routes.get('/listar-favoritos', favoriteListController.index);
routes.post('/listar-favoritos/:id', favoriteListController.store);

module.exports = routes;