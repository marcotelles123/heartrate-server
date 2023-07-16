const { Router } = require("express");
const PMTController = require("../controllers/pmt.controller");
const { authJwt } = require("../middlewares");
const routes = Router();

routes.get("/pmt", PMTController.index);
routes.post("/pmt", PMTController.saveNewPlayer);
routes.put("/pmt", PMTController.update);
routes.delete("/pmt/:id", PMTController.delete);
module.exports = routes;
