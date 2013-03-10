var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var ClothingSchema = new Schema({
    //_id : Number,
	//user_id : Number,
	photo : String,
	name : String,
	type : String,
	caption : String,
	brand : String,
	tapCounter : Number,
    lastupdated : { type: Date, default: Date.now }
});

// export 'Clothing' model
module.exports = mongoose.model('Clothing',ClothingSchema);