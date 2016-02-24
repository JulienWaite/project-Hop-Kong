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
            var bookmark_id = new ObjectID();

            db.collection('vendors').findOne({"_id": ObjectID(vendor_id)}, function(err, vendor){
              var newBookmark = {
                "_id": bookmark_id,
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

                    reply({message: "Bookmarked", bookmark_id: newBookmark._id}).code(200);
                    // reply.redirect('/bookmarks');
                  });
                } else {
                  reply({message: "Already Bookmarked"}).code(400);
                }
              });
            });
          } else {
            reply({message: "Not Authorized"}).code(400);
          }
        });
      }
    },
    {
      method: 'DELETE', // Remove bookmark
      path: '/api/bookmarks/{bookmark_id}',
      handler: function (request, reply) {
        Authenticated(request, function (result) { // from Authenticated js
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;  // connects to the database
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            //console.log(request.params.id);

            var user_id   = result.user._id;
            var bookmark_id = request.params.bookmark_id;

            var findBookmark = {
              bookmark_id: ObjectID(bookmark_id),
              user_id    : ObjectID(user_id)
            };

            // find the bookmark
            db.collection('bookmarks').findOne({"_id": findBookmark.bookmark_id}, function (err, bookmark) {
              if (err) {
                return reply(err).code(400);
            }

            // check if the bookmark exists
            if (bookmark === null) {
              return reply ({message: "There is no bookmark"}),code(404);
            }

            // check if it belongs to the user
            if (bookmark.user_id.toString() === findBookmark.user_id.toString()) {
              db.collection('bookmarks').remove({"_id": findBookmark.bookmark_id}, function (err, doc) { // delete the data!
                if (err) {
                  return reply(err).code(400);
                }
                reply(doc).code(200);
              });
            } else { // not your bookmark
              reply({message: "This is not your bookmark"}).code(400);
            }
          });
        } else { // can't delete if not logged in
          reply(result).code(400);
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