var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tb_transaksiSchema = new Schema({
	lensa_kiri: {type:String , required:true},
	lensa_kanan: {type: String , required:true},
	frame: {type: String , required: true},
	//bayar: {type: String , required: true},
	total: {type: String , required: true},
},
{
	timestamps: true
});

var tb_transaksi = mongoose.model('data_transaksi',tb_transaksiSchema);

module.exports = tb_transaksi;