var Authenticated = require("./modules/authenticated.js");
var Joi    = require('joi');

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
          console.log(request.query);
          if (request.query.vendorType) {
            query.type = { $in : [request.query.vendorType] };
          }

          if (request.query.beerCountry) {
            query.beerCountry = { $in : [request.query.beerCountry] };
          }

          if (request.query.vendorLocality) {
            query.locality = request.query.vendorLocality;
          }

          db.collection('vendors').find(query).toArray(function(err, vendors){
            var data = {
              vendors: vendors,
              user: result.user,
              authenticated: result.authenticated
            };

            reply.view('pages/home', data).code(200);
          });
        });
      }
    },
    { // Get ONE vendor for Vendors page
     method: 'GET',
     path: '/vendors/{id}',
     handler: function (request, reply) {
       Authenticated(request, function (result) {
         var db = request.server.plugins['hapi-mongodb'].db; // get the db address
         var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

         var id = ObjectID(request.params.id);

         db.collection('vendors').findOne({"_id": id}, function (err, vendor) {
           if (err) { return reply(err); }
           // reply(results).code(200);

           var data = {
            vendor: vendor,
            user: result.user,
            authenticated: result.authenticated
          };
           reply.view('pages/vendors', data).code(200);
         });
       });
     }
    },
    { // Get all bookmarks
      method: 'GET',
      path: '/bookmarks',
      handler: function(request, reply) {
        Authenticated(request, function (result) {

          var data = {
            user: result.user,
            authenticated: result.authenticated
          };

          reply.view('pages/bookmarks', data).code(200);
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'pages-views',
  version: '0.0.1'
};
