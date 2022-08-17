const Rate = require('../models/rate.model');

module.exports = {
    async index(request, response) {
        const rates = await Rate.find().sort({ date: 'desc' });
        console.log(JSON.stringify(rates));
        return response.json(rates);
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
            var d =  Date.now();
            d.setHours(d.getHours() - 2)
            let user = null;
            let rate = await Rate.create({
                rates,
                date: d,
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