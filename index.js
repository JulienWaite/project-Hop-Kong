var Path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();

// configuring the server address
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000
});

// plugins that need to be registered
var plugins = [
  { register: require('vision')}, // views
  { register: require('inert')}, // public files hosting
  { register: require('./routes/pages.js')},
  // { register: require('./routes/auth.js')}, // not required with modals
  { register: require('./routes/api/auth.js')},
  { register: require('./routes/api/bookmarks.js')}, // added for bookmarks
  { register: require('hapi-mongodb'), // setup the mongo connect
    options: {
      "url": process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/hapi-hopkong", // CHANGE-ME
      "settings": {
        "db": {
          "native_parser": false
        }
      }
    }
  },
  {
    register: require('yar'), // setup cookie stuff
    options: {
      cookieOptions: {
        password: process.env.COOKIE_PASSWORD || '12345678912345678912345678912345678912',
        isSecure: false
      }
    }
  }
];

// register plugins into the environment
server.register(plugins, function(err){
  if (err) {
    throw err;
  }

  // configure views
  server.views({
    engines: {html: require('ejs')},
    path: Path.join(__dirname, 'views'),
    layout: true,
    layoutPath: Path.join(__dirname, 'views/layouts')
  });

  // start the server
  server.start(function () {
    console.log("listening on..." + server.info.uri);
  });
});
