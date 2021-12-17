const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    bill: String,
    dueDate: Date,
    dueDateFormatted: String,
    paid: Boolean,
}, {strict: false});

module.exports = mongoose.model('Bill', BillSchema);