const axios = require('axios');
const Videos = require('../models/Videos');

module.exports = {
    async index(request, response) {
        const videos = await Videos.find();
        return response.json(videos);
    },
    async store(request, response) {
        const { url, name } = request.body;

        try {
            await Videos.create({
                url,
                name,
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
            response.json(e);
        }
    }
};