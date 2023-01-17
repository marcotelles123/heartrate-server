const Rate = require('../models/rate.model');
var WHITHOUT_DRINK = 0;
var DRINKED_YESTERDAY = 1;
var EATED_TRASH = 2;
var WORKOUT_YESTERDAY = 3;
module.exports = {
   
    async index(request, response) {
        const rates = await Rate.find().sort({ date: 'desc' });
        console.log(JSON.stringify(rates));
        return response.json(rates);
    },

    async average(request, response) {
        const rates = await Rate.find().sort({ date: 'desc' });
        const withoutDrink = ratesAverage(rates.filter(rate => rate.obs[WHITHOUT_DRINK] == true));
        const drinkedYesterday = ratesAverage(rates.filter(rate => rate.obs[DRINKED_YESTERDAY] == true));
        const eatedTrash = ratesAverage(rates.filter(rate => rate.obs[EATED_TRASH] == true));
        const workoutYesterday = ratesAverage(rates.filter(rate => rate.obs[WORKOUT_YESTERDAY] == true));
        const anyObs = ratesAverage(rates.filter(rate => rate.obs[WHITHOUT_DRINK] == false && rate.obs[DRINKED_YESTERDAY] == false && rate.obs[WORKOUT_YESTERDAY] == false&& rate.obs[EATED_TRASH] == false));
        const sunday = ratesAverage(rates.filter(rate => rate.date != undefined ? rate.date.getDay() == 0 : null));
        const monday = ratesAverage(rates.filter(rate => rate.date != undefined ?  rate.date.getDay() == 1 : null));
        const tuesday = ratesAverage(rates.filter(rate => rate.date != undefined ?  rate.date.getDay() == 2 : null));
        const wednesday = ratesAverage(rates.filter(rate => rate.date != undefined ?  rate.date.getDay() == 3 : null));
        const thrusday = ratesAverage(rates.filter(rate => rate.date != undefined ?  rate.date.getDay() == 4 : null));
        const friday = ratesAverage(rates.filter(rate => rate.date != undefined ?  rate.date.getDay() == 5 : null));
        const saturday = ratesAverage(rates.filter(rate => rate.date != undefined ?  rate.date.getDay() == 6 : null));

        console.log(JSON.stringify(rates));
        return response.json({
            "withoutDrink":withoutDrink, 
            "drinkedYesterday": drinkedYesterday, 
            "eatedTrash":eatedTrash, 
            "workoutYesterday":workoutYesterday, 
            "anyObs":anyObs,
            "sunday":sunday,
            "monday":monday,
            "tuesday":tuesday,
            "wednesday":wednesday,
            "thrusday":thrusday,
            "friday":friday,
            "saturday":saturday
        });
    },

    async delete(request, response) {
        const rates = await Rate.findByIdAndRemove(request.params.id, function (err, output) {
            if (err) {
                return next(err);
            }
            
            response.send(output === 1 ? { msg: "success" } : { msg: "error" });
        });
    },

    async store(request, response) {
        const { rates, obs } = request.body;
        
        try {
           
            let user = null;
            let rate = await Rate.create({
                rates,
                date: Date.now(),
                obs: obs,
            }, function (err, result) {
                if (err) {
                    // it failed
                    response.statusCode = 500;
                    console.log(err);
                    response.send(err);
                } else {
                    response.json(result)
                    response.send();
                }
            });
        } catch (e) {
            return e;
        }
    }
};

function ratesAverage(rates) {
    var totalSistolica = 0;
    var totalDiastolica = 0;
    rates.forEach(rate => {
        totalSistolica += rate.rates[0];
        totalDiastolica += rate.rates[1];
    });

    return {sistolica: totalSistolica / rates.length, diastolica: totalDiastolica / rates.length, total: rates.length}
}