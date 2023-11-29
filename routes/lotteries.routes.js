const { Router } = require("express");
const LoteriasController = require("../controllers/loterias.controller");
const { authJwt } = require("../middlewares");
const routes = Router();

routes.post("/lottery", LoteriasController.calculemyhits);
routes.post("/lottery/mybets", LoteriasController.saveMyBets);
routes.get("/lottery/mybets", LoteriasController.getMyBets);
routes.get("/lottery", LoteriasController.configs);
routes.get("/lottery/most/:kind", LoteriasController.getMostByKind);
module.exports = routes;
