const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema({
    url: String,
    name: String,
});

module.exports = mongoose.model('Videos', VideosSchema);