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
    }
  ]);

  // Vendors Page

  // Bookmarks Page

  next();
};

exports.register.attributes = {
  name: 'static-pages-views',
  version: '0.0.1'
};
