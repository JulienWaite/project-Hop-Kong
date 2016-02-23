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
    { // redirect the home page to hopkong
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply.redirect("/hopkong");
      }
    },
    { // Home page (Hop Kong) & getting all vendors
      method: 'GET',
      path: '/hopkong',
      handler: function(request, reply) {
        Authenticated(request, function (result) {  // include the results of user authentication
          var db = request.server.plugins['hapi-mongodb'].db; // get the db address

          var query = {};
          //console.log(request.query);
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
       Authenticated(request, function (result) { // include the results of user authentication
         var db = request.server.plugins['hapi-mongodb'].db; // get the db address
         var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

         var vendor_id = ObjectID(request.params.id);
         var user_id = result.user ? ObjectID(result.user._id) : null;

         db.collection('vendors').findOne({"_id": vendor_id}, function (err, vendor) {
           if (err) { return reply(err); }
           // reply(results).code(200);

          var queryBookmark = {
            vendor_id: vendor_id,
            user_id: user_id
          };

           db.collection('bookmarks').findOne(queryBookmark, function (err, bookmark) {
            if (err) { return reply(err); }

            var data = {
              vendor: vendor,
              user: result.user,
              authenticated: result.authenticated,
              bookmark: bookmark
            };

            reply.view('pages/vendors', data).code(200);
          });
         });
       });
     }
    },
    { // Get all bookmarks
      method: 'GET',
      path: '/bookmarks',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var db = request.server.plugins['hapi-mongodb'].db; // get the db address

          var query = {};

          db.collection('bookmarks').find(query).toArray(function(err, bookmarks){
            var data = {
              user: result.user,
              authenticated: result.authenticated,
              //bookmarks: [{test: "test1"},{test: "test2"}]
              bookmarks: bookmarks
            };
            console.log(data);

            reply.view('pages/bookmarks', data).code(200);
          });
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
