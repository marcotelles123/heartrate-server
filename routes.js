const { Router } = require ('express');
const RateController = require ('./controllers/RateController');
const VideosController = require ('./controllers/VideosController');
const AnnotationController = require ('./controllers/AnnotationController');
const LoteriasController = require ('./controllers/LoteriasController');
const routes = Router();

routes.get('/rates', RateController.index);
routes.post('/rates', RateController.store);
routes.delete('/rates/:id', RateController.delete);
routes.get('/videos', VideosController.index);
routes.post('/videos', VideosController.store);
routes.delete('/videos/:id', VideosController.delete);
routes.get('/annotation', AnnotationController.index);
routes.put('/annotation', AnnotationController.update);
routes.post('/annotation', AnnotationController.create);
routes.post('/lottery', LoteriasController.calculemyhits);
module.exports = routes;