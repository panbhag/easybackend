var mongoose = require('mongoose');
var dbName = "backend"
var dbServerURL = 'mongodb://localhost/'; 
var dbConnectionString = dbServerURL + dbName;
var  db = mongoose.connect(dbConnectionString); 
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);
