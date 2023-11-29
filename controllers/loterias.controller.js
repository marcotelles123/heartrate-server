const Lotofacil = require("../domain/loterias/lotofacil/Lotofacil");
const LotteryMySql = require("../infra/loterias/LotteryMySql");
const Lottery = require("../domain/loterias/Lottery");
const loteriasData = require("../domain/loterias/data/loterias.config.json");

module.exports = {
  async calculemyhits(request, response) {
    try {
      const { concoursenumber, lotterykind, drawnumbers } = request.body;
      await Lotofacil.calculehits(
        concoursenumber,
        lotterykind,
        drawnumbers,
        function (rates) {
          console.log(JSON.stringify(rates));

          return response.json(rates);
        }
      );
    } catch (e) {
      return e;
    }
  },
  async configs(request, response) {
    return response.json(loteriasData);
  },
  async saveMyBets(request, response) {
    try {
      const { hint, concourse, lotterykind, stubborn } = request.body;
      var results = [];
      for (let i = 0; i < stubborn; i++) {
        try {
          const result = await LotteryMySql.insertMyBets(
            hint,
            concourse + i,
            lotterykind,
            stubborn
          );
          results.push(result);
        } catch (error) {
          results.push({ error: error.message });
        }
      }

      response.status(200).json({ results });
    } catch (e) {
      return response.status(500).json({ error: e.message });
    }
  },
  async getMyBets(request, response) {
    try {
      await Lottery.getMyBets(function (rates) {
        console.log("node" + JSON.stringify(rates));

        return response.json(rates);
      });
    } catch (e) {
      return e;
    }
  },
  async getMostByKind(request, response) {
    try {
      const kind = request.params.kind;
      await Lottery.getMostByKind(kind, function (rates) {
        console.log("node" + JSON.stringify(rates));

        return response.json(rates);
      });
    } catch (e) {
      return e;
    }
  },
};
