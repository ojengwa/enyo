'use strict';

var env,
    mongodb,
    redis;

if (process.env.VCAP_SERVICES) {
    env = JSON.parse(process.env.VCAP_SERVICES);

    //Define the various db Configuretions from the envronment
    redis = env['redis-2.6'][0].credentials;
    // mongodb = env['mongodb-2.4'][0].credentials;

} else {
    redis = {
        "host": "127.0.0.1",
        "port": 6379,
        "username" : "",
        "password" : ""
    };
}

module.exports = {

  host: {
    url: process.env.VCAP_APP_HOST || 'localhost',
    port: process.env.VCAP_APP_PORT || 3000
  },

  db: {
    uri: process.env.MONGO_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/staffy'
  },
  redis: redis,
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
