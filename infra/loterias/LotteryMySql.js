const sql = require("./db");

module.exports = {
  async insertMyBets(hint, concourse, lotterykind, stubborn) {
    const query =
      "insert into lotterymybets (hint, concourse, lotterykind, stubborn) values (?, ?, ?, ?)";
    const values = [hint, concourse, lotterykind, stubborn];

    sql.query(query, values, (err, rows) => {
      console.log("retoando callback sql");

      if (err) {
        console.log("erro");
        throw err;
      }
      console.log("sucesso");
      return rows;
    });
  },
  async getMyBets(callback) {
    return new Promise((resolve, reject) => {
      var bets = [];
      var sqlQuery = sql.query(
        "SELECT id, hint, concourse, lotterykind, stubborn FROM lotterymybets order by id desc",
        (err, rows) => {
          if (err) throw err;

          return callback(rows);
        }
      );
      console.log("sql: ", sqlQuery.sql);
      console.log("Connected to MySQL Server!");
    });
  },
  async getMostByKind(kind, callback) {
    return new Promise((resolve, reject) => {
      var bets = [];
      var sqlQuery = sql.query(
        "SELECT id, lotterykind, mostlucky, inserteddate FROM lotterymost where lotterykind = " +
          kind +
          " order by id desc",
        (err, rows) => {
          if (err) throw err;

          return callback(rows);
        }
      );
      console.log("sql: ", sqlQuery.sql);
      console.log("Connected to MySQL Server!");
    });
  },
};
