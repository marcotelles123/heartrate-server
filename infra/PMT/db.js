const mysql = require("mysql");

var connection = mysql.createPool({
  host: 'br496.hostgator.com.br',
  port: '3306',
  user: 'blog9895_pmt',
  password: 'P@ssw0rdPMT',
  database: 'blog9895_pmt'
});

module.exports = connection;
