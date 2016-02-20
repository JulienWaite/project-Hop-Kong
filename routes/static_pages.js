var Authenticated = require("./modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    { // serving static files
      method: 'GET',
      path: "/public/{path*}",
      handler: {
        directory: {
          path: 'public'
        }
      }
    },
    { // Home Page
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var data = result; // need to have authenticated in order to show signout button
          reply.view('static_pages/home', data).code(200);
        });
      }
    },
    { // Vendors Page
      method: 'GET',
      path: '/vendors',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var data = result; // need to have authenticated in order to show signout button
          reply.view('static_pages/vendors', data).code(200);
        });
      }
    },
    { // Bookmarks
      method: 'GET',
      path: '/bookmarks',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var data = result; // need to have authenticated in order to show signout button
          reply.view('static_pages/bookmarks', data).code(200);
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'static-pages-views',
  version: '0.0.1'
};
