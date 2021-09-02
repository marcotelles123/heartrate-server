const mysql = require('mysql');
const sql = require("./../../loterias/db");

const connection = mysql.createConnection({
    host: 'br496.hostgator.com.br',
    port: '3306',
    user: 'blog9895_loteria',
    password: 'P@ssw0rd',
    database: 'blog9895_loterias'
});





module.exports = {
    async getDrawsByConcourseNumber(concourseNumber, lotteryKind, callback) {
        if (err) throw err;
        var sqlQuery = sql.query('SELECT NumbersDraw, ConcourseDate, ConcourseNumber FROM blog9895_loterias.lotteryconcourse where concourseNumber = '
            + concourseNumber + ' and lotteryKind = ' + lotteryKind + ' LIMIT 1', (err, rows) => {
                if (err) throw err;

                return callback(rows);
            });
        console.log('sql: ', sqlQuery.sql);
        console.log('Connected to MySQL Server!');
    },
    async getDrawsLastConcourse(lotteryKind, callback) {
        var sqlQuery = sql.query('SELECT NumbersDraw, ConcourseDate, ConcourseNumber FROM blog9895_loterias.lotteryconcourse where lotteryKind = ' + lotteryKind + ' order by id desc  LIMIT 1', (err, rows) => {
            console.log('this.sql', this.sql);
            if (err) throw err;

            return callback(rows);
        });
        console.log('sql: ', sqlQuery.sql);
    }
};