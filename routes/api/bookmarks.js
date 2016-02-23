var Authenticated = require("../modules/authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    {
      method: "POST",
      path: "/api/bookmarks",
      handler: function (request, reply) {
        Authenticated(request, function (result) { // from Authenticated js
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

            var vendor_id = request.payload.vendor_id;
            var user_id   = result.user._id;

            db.collection('vendors').findOne({"_id": ObjectID(vendor_id)}, function(err, vendor){
              var newBookmark = {
                vendor: vendor,
                vendor_id: ObjectID(vendor_id),
                user_id: ObjectID(user_id)
              };

              // check if we already bookmarked
              db.collection('bookmarks').findOne(newBookmark, function(err, bookmark){
                if (err) { return reply(err).code(400); }

                if (bookmark === null) {
                  db.collection('bookmarks').insert(newBookmark, function(err, doc) {
                    if (err) { return reply(err).code(400); }

                    reply({message: "Bookmarked"}).code(200);
                    // reply.redirect('/bookmarks');
                  });
                } else {
                  reply({message: "Already Bookmarked"}).code(400);
                }
              });
            });
          } else {
            reply({message: "Not Authorize"}).code(400);
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'bookmarks-api',
  version: '0.0.1'
};