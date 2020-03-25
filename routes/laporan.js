var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var data_transaksi = require("../models/model.transaksi");
var secret = "arsalan";
var session_store;
var Auth_mdw = require('../middlewares/auth');

router.get("/" , Auth_mdw.is_admin , function( req , res , next){
	session_store = req.session;
	data_transaksi.find({}, function(err , data_laporan){
		res.render("pages/laporan/index.ejs" , {title : "Laporan" , session_store:session_store , data_transaksi:data_laporan})
	})
})

/* saya merubah ini */
router.get("/:id/del" , Auth_mdw.is_admin , function( req , res , next){
	var session_store = req.session;
  	let id = req.params.id;
  	data_transaksi.findByIdAndRemove({_id:id}, function(err , data){
  	  if(err) throw err;
  	  res.redirect("/laporan");
  	})
})

/* sampai sini */

module.exports = router;
