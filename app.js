var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const annotationRoutes = require('./routes/annotation.routes');
const lotteriesRoutes = require('./routes/lotteries.routes');
const ratesRoutes = require('./routes/rates.routes');
const videosRoutes = require('./routes/videos.routes');
const billsRoutes = require('./routes/bills.routes');
const pmtRoutes = require('./routes/pmt.routes');

const app = express();
const server = http.Server(app);


try {
    mongoose.connect('mongodb+srv://sa:P@ssw0rd@cluster0-etowf.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        initial();
    });
} catch (e) {
    console.log('Error happend while connecting to the DB: ', e.message)
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(annotationRoutes);
app.use(lotteriesRoutes);
app.use(ratesRoutes);
app.use(videosRoutes);
app.use(billsRoutes);
app.use(pmtRoutes);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const db = require("./models/index");
const Role = db.role;


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
};

server.listen(process.env.PORT || 3334);

module.exports = {server, mongoose };