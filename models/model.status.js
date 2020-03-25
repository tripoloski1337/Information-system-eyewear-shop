var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tb_statusSchema = new Schema({
	lensa_kiri: {type:String , required:true},
	lensa_kanan: {type: String , required:true},
	frame: {type: String , required: true},
	//bayar: {type: String , required: true},
	status: {type: String , required: true},
},
{
	timestamps: true
});

var tb_status = mongoose.model('data_status',tb_statusSchema);

module.exports = tb_status;