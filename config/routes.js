// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('passport');


module.exports = function routes() {
  
  //changes the verb if there is a _method in body
  /**this.post("*",function(req,res,next){
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log(req.method);
      console.log(req.body,req.params,req.query);
      if(req.body._method)
      {	
		consolellog("modifying method...");
		req.method(req.body._method);
      }
      console.log('after');
      console.log(req.method);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      next();
  })**/

  // this.match('/login',
  // passport.authenticate('local_client', { successRedirect: '/home',
  //                                  failureRedirect: '/login',
  //                                 failureFlash: true }), {via:"post"}
  // );
    
  this.match('/logout', function(req, res){
  req.logout();
  res.redirect('/');
  });


  this.match("/1/users","users#create",{via:"post"});
  this.match("/1/login",passport.authenticate('local_client'), function(req,res){
    self.res.json(req.user);
        //   {
        // "username": "cooldude6",
        // "phone": "415-392-0202",
        // "createdAt": "2011-11-07T20:58:34.448Z",
        // "updatedAt": "2011-11-07T20:58:34.448Z",
        // "objectId": "g7y9tkhB7O",
        // "sessionToken": "pnktnjyb996sj4p156gjtp4im"
        //   }

  })
  this.match("/:apiVersion/classes/:className", "parseObjects#create",{via:"post"}); //create object
  this.match("/:apiVersion/classes/:className/:objectId","parseObjects#show",{via:"get"});  //get object
  this.match("/:apiVersion/classes/:className/:objectId","parseObjects#update",{via:"put"});  //PUT object
  this.match("/:apiVersion/classes/:className/:objectId","parseObjects#destroy",{via:"delete"});  //delete object
  this.match("/:apiVersion/classes/:className","parseObjects#index",{via:"get"});  //get list
  this.match("/1/functions/:functionName","cloudFunctions#run",{via:"post"});

}
