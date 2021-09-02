const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
    text: String,
});

module.exports = mongoose.model('Annotation', AnnotationSchema);