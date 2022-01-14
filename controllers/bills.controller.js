const BillModel = require('../models/bill.model');
var moment = require('moment');
const { defaultFormat } = require('moment');

module.exports = {
    async index(request, response) {
        try {
            const bills = await BillModel.find().sort({ bill: 'asc' });

            return response.json(bills);
        } catch (e) {
            return e;
        }
    },

    async delete(request, response) {
        const bills = await BillModel.findByIdAndRemove(request.params.id, function (err, output) {
            if (err) {
                return next(err);
            }

            response.send(output === 1 ? { msg: "success" } : { msg: "error" });
        });
    },

    async store(request, response) {
        const { bill, dueDate, dueNumber } = request.body;

        try {

            var dueLimit = null;
            if (dueNumber){
                var datetime = new Date();
                datetime.setMonth(datetime.getMonth() + dueNumber);
                dueLimit = datetime;
            }


            let user = null;
            let billDb = await BillModel.create({
                bill,
                dueDate,
                dueLimit: dueLimit,
                paid: false,
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
    },

    async update(request, response) {
        try {
            var { paid } = request.body;
            var query = { _id: request.params.id };
            var newvalues = { $set: { paid: paid } };
            const bills = await BillModel.updateOne(query, newvalues, function (err, output) {
                if (err) {
                    return next(err);
                }

                response.send(output.ok === 1 ? { msg: "success" } : { msg: "error" });
            });
        } catch (e) {
            return e;
        }
    }
};