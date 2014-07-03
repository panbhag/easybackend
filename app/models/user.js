var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var denormalize = require('mongoose-denormalize');

var UserSchema = new Schema({
 username:{ type: String, required: true},
 password:{ type: String, required: true },
 email:{ type: String},
 emailVerified: {type:Boolean},
 createdAt:{type:Date, default:function(){ return new Date()}},
 updatedAt:{type:Date, default:function(){ return new Date()}}
},{ strict: false });
module.exports = mongoose.model('User',UserSchema);