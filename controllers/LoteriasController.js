const Lotofacil = require('../domain/loterias/lotofacil/Lotofacil');

module.exports = {

    async calculemyhits(request, response) {
        try {
            const { concoursenumber, lotterykind, drawnumbers } = request.body;
            await Lotofacil.calculehits(concoursenumber, lotterykind, drawnumbers, function (rates){
                console.log(JSON.stringify(rates));

                return response.json(rates);
            });
           
        } catch (e) {
            return e;
        }
    },
};