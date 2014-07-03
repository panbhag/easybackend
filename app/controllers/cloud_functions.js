var locomotive = require('locomotive');
var mongoose = require('mongoose');
//var async = require('async'); //https://npmjs.org/package/asyncjs
var _ = require("underscore");
var Schema = mongoose.Schema;
var ObjectSchema = new Schema({
	createdAt:{type:Date, default:function(){ return new Date()}},
	updatedAt:{type:Date, default:function(){ return new Date()}}

},{ strict: false });




var Controller = locomotive.Controller;


var CloudFunctionsController = new Controller();


CloudFunctionsController.run = function(){
	var self = this;
	var functionName = self.param("functionName");

	var functionParams = _.omit(self.param,"functionName");

	var response = {result: CloudFunction[functionName](functionParams)}

	self.res.json(response);
}

var CloudFunction = {}

CloudFunction.greet = function(callback)
{
	callback("hello world")
}

CloudFunction.initTest = function(callback){


	var Student = mongoose.model("Student",ObjectSchema);
	var Teacher = mongoose.model("Teacher",ObjectSchema);


	Student.remove({}, function(err,response){

		if(err){console.log(err);callback(err);}
	  	
	  	var studentsData = [
	      {name:"Pankaj",rank:1,score:100,stream:"science",defaulter:true, subjects:["chemistry","history"]},
	      {name:"Ajit",rank:2,score:90,stream:"science", subjects:["maths","history"]},
	      {name:"Sachin",rank:3,score:80,stream:"science", subjects:["maths","history"]},
	      {name:"Satish",rank:4,score:70,stream:"commerce", subjects:["maths","history"]},
	      {name:"Aman",rank:5,score:60,stream:"commerce", subjects:["maths","history"]}
	  	];

	  _.each(studentsData,function(sd){

	    var student = new Student(sd);
	    student.save(function(err,s){
	    	if(err){console.log(err);callback(err);}

	    })
		})


	    var teachersData = [
	    	{name:"Bawa",branch:"commerce"},
	    	{name:"Dinesh",branch:"science"},
	    ]

	  _.each(teachersData,function(td){

	    var teacher = new Teacher(td);
	    teacher.save(function(err,t){
	    	if(err){console.log(err);callback(err);}
	    })
		})


	  	callback({message:"data created"});

	})

}

module.exports = CloudFunctionsController;



