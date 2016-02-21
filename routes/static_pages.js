var Authenticated = require("./modules/Authenticated.js");
var Joi    = require('joi'); // Carmen code

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
    },
    // CARMEN CODE
    { // Get ONE vendor
     method: 'GET',
     path: '/vendors/{id}',
     handler: function (request, reply) {
       Authenticated(request, function (result) {
         console.log(request);
         var db = request.server.plugins['hapi-mongodb'].db;
         var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

         var id = ObjectID(request.params.id);

         db.collection('vendors').findOne({"_id": id}, function (err, vendor) {
           if (err) { return reply(err); }
           // reply(results).code(200);
           reply.view('static_pages/vendors', {vendor: vendor, authenticated: result.authenticated}).code(200);
         });
       });
     }
   }
   //END OF CARMEN CODE

  ]);

  next();
};

exports.register.attributes = {
  name: 'static-pages-views',
  version: '0.0.1'
};
