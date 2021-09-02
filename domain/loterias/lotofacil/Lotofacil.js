const Lotofacil = require('../../../infra/loterias/lotofacil/LotofacilMySql');
const DateUtil = require('../../../util/DateUtil');

module.exports = {
    async calculehits(concoursenumber, lotterykind, mydrawnumbers, callback) {
        let rates;
        if (concoursenumber) {
            Lotofacil.getDrawsByConcourseNumber(concoursenumber, lotterykind, function (res) {
                console.log(JSON.stringify(res));
                return callback(comparehits.call(this, mydrawnumbers, res));
            });
        } else {
            Lotofacil.getDrawsLastConcourse(lotterykind, function (res) {
                console.log(JSON.stringify(res));
                return callback(comparehits.call(this, mydrawnumbers, res));
            });
        }

        return rates;
    },

};
function comparehits(mydrawnumbers, dbResult) {
    let hits = [];
    if (dbResult.length < 1){
        return Error("Resultado não encontrado");
    }
    let result = dbResult[0]; 
    let lotterydrawnumbers = result.NumbersDraw.split(",");
    lotterydrawnumbers.forEach(lotteryNumber => {
        if (mydrawnumbers.includes(lotteryNumber)){
            console.log(lotteryNumber);
            hits.push(lotteryNumber);
        }
      });

    let response = {};  
    response.hits = hits;
    response.hitsCount = hits.length;
    response.concourseNumber = result.ConcourseNumber;
    response.concourseDate = DateUtil.formatDateHardCoded(result.ConcourseDate);

    return response;
}