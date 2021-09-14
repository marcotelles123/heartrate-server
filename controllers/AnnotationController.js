const Annotation = require('../models/Annotation');

module.exports = {
    
    async index(request, response) {
    
        const rates = await Annotation.findOne({_id: "612d8c8113fabf04c4ad029f"});
        console.log(JSON.stringify(rates));
        
        return response.json(rates);
    },
    async create(request, response) {
       
        const { text } = request.body;
        
        try {
           
            let rate = await Annotation.create({ text: text } ,function(
                err,
                result
              ) {
                if (err) {
                    console.log(err);
                    response.send(err);
                } else {
                    console.log(result);
                    response.json(result);
                }
              });
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async update(request, response) {
       
        const { text } = request.body;
        
        try {
           
            let rate = await Annotation.findOneAndUpdate({_id: "612d8c8113fabf04c4ad029f"},{ text: text } ,function(
                err,
                result
              ) {
                if (err) {
                    console.log(err);
                    response.send(err);
                } else {
                    console.log(result);
                    response.json(result);
                }
              });
        } catch (e) {
            console.log(e);
            return e;
        }
    }
};