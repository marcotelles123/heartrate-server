var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
const server = http.Server(app);

try {
    mongoose.connect('mongodb+srv://sa:P@ssw0rd@cluster0-etowf.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (e) {
    console.log('Error happend while connecting to the DB: ', e.message)
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3334);