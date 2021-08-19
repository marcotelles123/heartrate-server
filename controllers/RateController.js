const axios = require('axios');
const Rate = require('../models/Rate');

module.exports = {
    async index(request, response) {
        const rates = await Rate.find().sort({ date: 'desc' });
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
            let user = null;
            let rate = await Rate.create({
                rates,
                date: Date.now(),
                obs,
            }, function (err, result) {
                if (err) {
                    // it failed
                    response.statusCode = 500;
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