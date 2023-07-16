const PlayerMySql = require("../infra/PMT/PlayerMySql");

module.exports = {
  async saveNewPlayer(request, response) {
    try {
      const { name } = request.body;
      await PlayerMySql.saveNewPlayer(name, function (result) {
        console.log(JSON.stringify(result));

        return response.json(name);
      });
    } catch (e) {
      return e;
    }
  },
  async index(request, response) {
    const rates = await PlayerMySql.getPlayers();
    console.log(JSON.stringify(rates));
    return response.json(rates);
  },
  async update(request, response) {
    try {
      const { popcorn, enemy, came, gameate } = request.body;
      let updateResult = 0;

      if (popcorn.length > 0)
        updateResult += await PlayerMySql.updatePopcorn(popcorn);
      if (enemy.length > 0)
        updateResult += await PlayerMySql.updateEnemy(enemy);
      if (came.length > 0) updateResult += await PlayerMySql.updateCame(came);

      if (updateResult > 0) {
        response.status(200).send({ msg: "success" });
      } else {
        response.status(404).send({ msg: "Nenhum jogador encontrado" });
      }
    } catch (ex) {
      response.status(500).send({ error: ex.message });
    }
  },
  async delete(request, response) {
    try {
      const result = await PlayerMySql.deletePlayer(request.params.id);
      if (result === 1) {
        response.send({ msg: "success" });
      } else {
        response.send({ msg: "Nenhum jogador encontrado" });
      }
    } catch (error) {
      response
        .status(500)
        .send({ error: "Ocorreu um erro ao excluir o jogador." });
    }
  },
};
