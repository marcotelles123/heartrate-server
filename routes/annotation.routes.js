const { Router } = require ('express');
const AnnotationController = require ('../controllers/annotation.controller');
const { authJwt } = require("../middlewares");
const routes = Router();

routes.get('/annotation', [authJwt.verifyToken], AnnotationController.index);
routes.put('/annotation', [authJwt.verifyToken], AnnotationController.update);
routes.post('/annotation', [authJwt.verifyToken], AnnotationController.create);
module.exports = routes;