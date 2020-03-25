var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tb_frameSchema = new Schema({
	merk: {type:String , required:true},
	harga: {type: String , required:true},
	stock: {type: String , required: true}
},
{
	timestamps: true
});

var tb_frame = mongoose.model('data_frame',tb_frameSchema);

module.exports = tb_frame;	