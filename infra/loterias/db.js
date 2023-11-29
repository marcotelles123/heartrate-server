const mysql = require("mysql");

var connection = mysql.createPool({
  host: "br496.hostgator.com.br",
  port: "3306",
  user: "blog9895_loteria",
  password: "P@ssw0rd",
  database: "blog9895_loterias",
  connectTimeout: 60000,
});

module.exports = connection;
