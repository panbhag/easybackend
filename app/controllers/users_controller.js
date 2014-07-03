var locomotive = require('locomotive');
var mongoose = require('mongoose');
//var async = require('async'); //https://npmjs.org/package/asyncjs
var _ = require("underscore");
var Schema = mongoose.Schema;
var User  = require("./../models/user.js");


var Controller = locomotive.Controller;

var queryBuilder = require("./../lib/queryBuilder");

var UsersController = new Controller();


UsersController.index = function(){
    var self = this;
    var objectParams = self.req.body;
    queryBuilder.find(User,objectParams,function(err,result)
    {
        self.res.json(result);
    })
}


UsersController.create = function(){
    var user = new User();
    user.set(objectParams) ;
    user.set({'objectId':object._id});
    user.save(function(err,o){
	console.log(o);
	if(err){console.log(err);self.res.send(500,err)}

        self.res.set({
          'Content-Type': 'text/plain',
          'Location': "https://api.parse.com/1/users/" + user._id,
          'Status': '201 Created'
        })

        self.res.json({objectId:o._id, createdAt:o.createdAt,sessionToken:"abcdE"});	


  });


    //Response headers
    //Status: 201 Created
	//Location: https://api.parse.com/1/users/g7y9tkhB7O

	//response
	//{
  	//	"createdAt": "2011-11-07T20:58:34.448Z",
  	//	"objectId": "g7y9tkhB7O",
  	//	"sessionToken": "pnktnjyb996sj4p156gjtp4im"
	//}
}



UsersController.update = function(){



    var self = this;
    
    var objectParams = self.req.body;

    User.findById(this.param('objectId'),function(err,user){
        
        if(err){console.log(err);self.res.send(500,err)}
     
        user.set(objectParams);
        user.save(function(err,u){
            if(err){console.log(err);self.res.send(500,err)}
            self.res.send({updatedAt:u.updatedAt});
        });

    });

}

UsersController.destroy = function(){

   var self = this;
   
   User.findById(this.param('objectId'),function(err,object){
      if(err){console.log(err);self.res.send(500,err);return}
      user.remove(function(err,o)
      {
        if(err){console.log(err);self.res.send(500,err)}
          self.res.send(true);
      });
    })
}

module.exports = UsersController;


//email verification
/** Enabling email verification in an application's settings allows the application to reserve part of its experience for users with confirmed email addresses. Email verification adds the emailVerified field to the User object. When a User's email is set or modified, emailVerified is set to false. Parse then emails the user a link which will set emailVerified to true.

There are three emailVerified states to consider:

true - the user confirmed his or her email address by clicking on the link Parse emailed them. Users can never have a true value when the user account is first created.
false - at the time the User object was last refreshed, the user had not confirmed his or her email address. If emailVerified is false, consider refreshing the User object.
missing - the User was created when email verification was off or the User does not have an email.
**/





