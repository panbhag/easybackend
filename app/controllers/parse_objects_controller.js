var locomotive = require('locomotive');
var mongoose = require('mongoose');
//var async = require('async'); //https://npmjs.org/package/asyncjs
var _ = require("underscore");
var queryBuilder = require("../lib/queryBuilder.js");
var Schema = mongoose.Schema;
var ObjectSchema = new Schema({
	createdAt:{type:Date, default:function(){ return new Date()}},
	updatedAt:{type:Date, default:function(){ return new Date()}}

},{ strict: false });


var Controller = locomotive.Controller;


var ParseObjectsController = new Controller();

function omitUnderscore(collection){

    var result = {}
    _.each(collection,function(v,k){
        if(k[0] != "_"){
            result[k] = v
        }
    })
    return result;


}

ParseObjectsController.index = function(){

    var self = this;
    var className = self.param('className');
    var objectModel = mongoose.model(className,ObjectSchema)
    var objectParams = self.req.body;
    
    queryBuilder.find(objectModel,objectParams,function(err,result)
    {
        self.res.json(result);
    })


}
    
ParseObjectsController.show = function(){
	
    var self = this;
    var className = self.param('className');
    var ObjectModel = mongoose.model(className,ObjectSchema)

    ObjectModel.findById(this.param('objectId'),function(err,o){
	if(err){console.log(err);self.res.send(500,err)}
	o = o.toJSON() ;
	delete o._id;
	delete o.__v;
        self.res.json(o);
    });
}


ParseObjectsController.create = function(){
    var self = this;
    var className = self.param('className');
    var objectParams = self.req.body;
    objectParams = omitUnderscore(objectParams)

    var ObjectModel = mongoose.model(className,ObjectSchema)

    var object = new ObjectModel();
    object.set(objectParams) ;
    object.set({'objectId':object._id});
    
    object.save(function(err,o){
	console.log(o);
	if(err){console.log(err);self.res.send(500,err)}
        self.res.send({objectId:o._id, createdAt:o.createdAt});	
    });
}

ParseObjectsController.update = function(){



    var self = this;
    var className = self.param('className');
    var objectParams = self.req.body;
    objectParams = omitUnderscore(objectParams);


    var ObjectModel = mongoose.model(className,ObjectSchema);


    ObjectModel.findById(this.param('objectId'),function(err,object){
        
        if(err){console.log(err);self.res.send(500,err)}
     
        object.set(objectParams);
        object.save(function(err,o){
            if(err){console.log(err);self.res.send(500,err)}
            self.res.send({updatedAt:o.updatedAt});
        });

    });

}

ParseObjectsController.destroy = function(){

   var self = this;
   var self = this;
   var className = self.param('className');
   var ObjectModel = mongoose.model(className,ObjectSchema)
   
   ObjectModel.findById(this.param('objectId'),function(err,object){
        if(err){console.log(err);self.res.send(500,err);return}
		object.remove(function(err,o)
		{
		        if(err){console.log(err);self.res.send(500,err)}
			self.res.send(true);
		});
    })
}




    /**console.log("************params****************")
	console.log(self.param('className'))
	console.log(self.req.body);
    console.log("****************************")
    **/
module.exports = ParseObjectsController;


