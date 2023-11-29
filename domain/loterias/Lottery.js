const LotteryMySql = require("../../infra/loterias/LotteryMySql");

module.exports = {
  async insertMyBets(data) {
    const { hint, concourse, lotterykind, stubborn } = data;

    if (stubborn <= 0) {
      return [];
    }

    const insertPromises = [];

    return await LotteryMySql.insertMyBets(
      hint,
      concourse,
      lotterykind,
      stubborn
    );

    // for (let i = 0; i < stubborn; i++) {
    //  const insertPromise = LotteryMySql.insertMyBets(
    //     hint,
    //    concourse + i,
    //     lotterykind,
    //    stubborn,
    //   function (res) {
    //     insertPromises.push(insertPromise);
    //   }
    //  );
    //  setTimeout(() => {
    //    console.log("Pausa.");
    //   }, 1000);
    //}

    const results = await Promise.all(insertPromises);
    console.log("retoando domain");
    return results;
  },
  async getMyBets(callback) {
    console.log("retornando domains: ");
    return await LotteryMySql.getMyBets(function (res) {
      return callback(res);
    });
  },
  async getMostByKind(kind, callback) {
    console.log("retornando domains: ");
    return await LotteryMySql.getMostByKind(kind, function (res) {
      return callback(res);
    });
  },
};
