const Videos = require('../models/videos.model');

module.exports = {
    async index(request, response) {
        const videos = await Videos.find().sort('name');
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
    },
    async delete(request, response) {
        const rates = await Videos.findByIdAndRemove(request.params.id, function (err, output) {
            if (err) {
                return next(err);
            }
            
            response.send(output === 1 ? { msg: "success" } : { msg: "error" });
        });
    },
};