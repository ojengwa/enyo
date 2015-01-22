'use strict';

// Load required packages
var restify = require('restify'),
    bunyan = require('bunyan'),
    restifyJWT = require('restify-jwt'),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    log = bunyan.createLogger({name:'api2.server.js'}),

    auth = require('./services/auth'),
    Users = require('./controllers/user'),
    Utils = require('./core/utils').Utils,

    app = restify.createServer({
      name: 'Andela.reportr.apis',
      version: '2.0.1',
      log: log,
      handleUpdates: true
    });

// Connect to MongoDB
//mongoose.connect(config.db.uri);


//Register restify's middlewares
app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.jsonp());
app.use(restify.bodyParser());

//Register other middlewares
app.use(restify.CORS());

// //Register JWT middiware
// app.use(restifyJWT({
//     secret: Utils.salt,
//     getToken: auth.getToken,
//     credentialsRequired: true
//   })
//   .unless({
//     path: ['/api/v1/users/create'],
//     method: ['POST']
//   })
// );

//Routes for User resources
app.get('/api/v1/users', Users.getUsers);
app.post('/api/v1/users/create', Users.signup);
app.get('/api/v1/users/:username', Users.getUser);
app.put('/api/v1/users/:username/update', Users.putUser);
app.del('/api/v1/users/:username/delete', Users.deleteUser);

app.get('/', function (req, res) {
  res.send("Hello world");
})

app.listen(config.host.port, config.host.url);
