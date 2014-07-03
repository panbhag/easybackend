var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var util = require('util')

var User = require('../../app/models/user');
// var Admin = require('../../app/models/admin');
//var config = require('konphyg')(__dirname + '/../../config');

//var TWITTER_CONSUMER_KEY = "Xf0MtwH2Gt78AYJDks6A";
//var TWITTER_CONSUMER_SECRET = "ABOmB05D7sXOzCGTrl6I4isMt5H8oDwxoBANRpWw";

//var config_local = config('config');

//var http = require('http')
//var staticPath = 'http://localhost:3000/';
//var staticPath='http://www.one-world-family.org/';

//var httpg = require('http-get');
//var fs = require('fs');
//var path = require('path');
//var _ = require('underscore');



passport.use('local_client',new LocalStrategy(
  function(username, password, done) {
    User.findOne({ userName: username }, function(err, user) {

      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.'});
      }
      if(!(user.password == password))
      {
          return done(null, false, { message: 'Incorrect username or password.'});
      }
      return done(null, user);
    });
  }
));


// Passport session setup.

passport.serializeUser(function(user, done) {
        console.log("serializeUser :", user)
        //done(null, user._id);
        done(null, user._id);

});

passport.deserializeUser(function(_id, done) {
        console.log("id :", _id)
        User.findOne({
                  _id : _id
        }, function(err, user) {
                done(err, user);
        });
        //done(null, _id);
});