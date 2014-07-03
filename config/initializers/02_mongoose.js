var mongoose = require('mongoose');
var  db = mongoose.connect('mongodb://localhost/backend');
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);
