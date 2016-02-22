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
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply.redirect("/hopkong");
      }
    },
    { // Home Page & Getting all vendors
      method: 'GET',
      path: '/hopkong',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var db = request.server.plugins['hapi-mongodb'].db; // get the db address

          var query = {};
          if (request.query.type) {
            query.type = { $in : [request.query.type] };
          }
          if (request.query.beerCountries) {
            query.beerCountries = { $in : [request.query.beerCountries] };
          }
          if (request.query.locality)      { query.locality = request.query.locality; }

          db.collection('vendors').find(query).toArray(function(err, vendors){
            var data = {
              vendors: vendors,
              authenticated: result.authenticated
            };

            reply.view('pages/home', data).code(200);
          });
        });
      }
    },
    { // Get ONE vendor
     method: 'GET',
     path: '/vendors/{id}',
     handler: function (request, reply) {
       Authenticated(request, function (result) {
         var db = request.server.plugins['hapi-mongodb'].db;
         var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

         var id = ObjectID(request.params.id);

         db.collection('vendors').findOne({"_id": id}, function (err, vendor) {
           if (err) { return reply(err); }
           // reply(results).code(200);
           reply.view('pages/vendors', {vendor: vendor, authenticated: result.authenticated}).code(200);
         });
       });
     }
    },
    { // Bookmarks
      method: 'GET',
      path: '/bookmarks',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var data = result; // need to have authenticated in order to show signout button
          reply.view('pages/bookmarks', data).code(200);
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
