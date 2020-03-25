var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tb_lensaSchema = new Schema({
	lensa: {type:String , required:true},
	harga: {type: String , required:true},
	stock: {type: String , required: true}
},
{
	timestamps: true
});

var tb_lensa = mongoose.model('data_lensa',tb_lensaSchema);

module.exports = tb_lensa;