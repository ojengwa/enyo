'use strict';

// Load required packages
var restify = require('restify'),
    bunyan = require('bunyan'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    log = bunyan.createLogger({name:'api2.server.js'}),

    Users = require('./controllers/user');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/staffy');

var app = restify.createServer({
  name: 'Andela.reportr.apis',
  version: '2.0.1',
  log: log,
  handleUpdates: true
});

//Register restify's middlewares
app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.jsonp());
app.use(restify.bodyParser());

//Register other middlewares
app.use(cors());

//Routes for User resources
app.post('/api/v1/users', Users.postUsers);
app.get('/api/v1/users', Users.getUsers);
app.get('/api/v1/users/:userId', Users.getUser);
app.put('/api/v1/users/:userId/update', Users.putUser);
app.del('/api/v1/users/:userId/delete', Users.deleteUser);

app.listen(3000);
