const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    rates: [Number],
    date: Date,
});

module.exports = mongoose.model('Rate', RateSchema);