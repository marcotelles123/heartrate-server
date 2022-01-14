const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    bill: String,
    dueDate: Number,
    dueLimit: Date,
    paid: Boolean,
}, {strict: false});

module.exports = mongoose.model('Bill', BillSchema);