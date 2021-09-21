const { Router } = require ('express');
const VideosController = require ('../controllers/videos.controller');
const routes = Router();

routes.get('/videos', VideosController.index);
routes.post('/videos', VideosController.store);
routes.delete('/videos/:id', VideosController.delete);

module.exports = routes;