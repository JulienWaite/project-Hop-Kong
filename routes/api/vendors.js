var Authenticated = require("../modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    {
      method: "GET",
      path: "/api/vendors",
      handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('vendors').find().toArray(function(err, vendors){
          if (err) {
            return reply(err).code(400);
          }
          reply(vendors).code(200);

          //var tempVendors = [
           // {
           //   name: "a"
          //  },
          //  {
           //   name: "b"
           // }
         // ];

          //reply(tempVendors).code(200);

        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'vendors-api',
  version: '0.0.1'
};