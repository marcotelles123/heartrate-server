const { Router } = require ('express');
const RateController = require ('./controllers/RateController');
const VideosController = require ('./controllers/VideosController');
const routes = Router();

routes.get('/rates', RateController.index);
routes.post('/rates', RateController.store);
routes.delete('/rates/:id', RateController.delete);
routes.get('/videos', VideosController.index);
routes.post('/videos', VideosController.store);
routes.delete('/videos/:id', VideosController.delete);
module.exports = routes;