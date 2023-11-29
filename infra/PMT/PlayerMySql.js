
const sql = require("../PMT/db");


module.exports = {
  async getPlayers() {
    return new Promise((resolve, reject) => {
      var sqlQuery = sql.query(
        "SELECT ID, year23, year24, name, scheduledGame, popcorn FROM blog9895_pmt.player",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              rows.map((row) => ({
                id: row.ID,
                year23: row.year23,
                year24: row.year24,
                name: row.name,
                scheduledGame: row.scheduledGame,
                popcorn: row.popcorn,
              }))
            );
          }
        }
      );
      console.log("sql: ", sqlQuery.sql);
      console.log("Connected to MySQL Server!");
    });
  },
  async saveNewPlayer(name, callback) {
    var sqlQuery = sql.query(
      "INSERT INTO blog9895_pmt.player (name) VALUES (?);",
      name,
      (err, rows) => {
        if (err) throw err;

        return callback(rows);
      }
    );
  },
  async deletePlayer(id) {
    return new Promise((resolve, reject) => {
      var sqlQuery = sql.query(
        "DELETE FROM blog9895_pmt.player WHERE Id = (?);",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  },
  async updatePopcorn(popcornIds) {
    return new Promise((resolve, reject) => {
      var sqlQuery = sql.query(
        "UPDATE player SET popcorn " +
          " = COALESCE(popcorn, 0) + 1 WHERE id IN (?)",
        [popcornIds],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  },
  async updateCame(came) {
    return new Promise((resolve, reject) => {
      var sqlQuery = sql.query(
        "UPDATE player SET year23 " +
          " = COALESCE(year23, 0) + 1 WHERE id IN (?)",
        [came],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  },
  async updateEnemy(enemy) {
    return new Promise((resolve, reject) => {
      var sqlQuery = sql.query(
        "UPDATE player SET scheduledGame " +
          " = COALESCE(scheduledGame, 0) + 1 WHERE id IN (?)",
        [enemy],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  },
};
