var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var data_lensa = require("../models/model.lensa");
var data_frame = require("../models/model.frame");

var data_lensa2 = require("../models/model.lensa");
var data_frame2 = require("../models/model.frame");

var data_transaksi = require("../models/model.transaksi");
var data_status = require("../models/model.status");

var secret = "arsalan";
var session_store;
var Auth_mdw = require('../middlewares/auth');

router

router.get("/" , Auth_mdw.is_admin , function( req , res , next){
	let lens_left  = req.query.lens_left;
	let lens_right = req.query.lens_right;
	let frame 	   = req.query.frame;
	console.log("lens right " + lens_right)
	console.log("lens left " + lens_left)
	console.log("lens frame " + frame)
	session_store = req.session;
	data_lensa.find({}, function(err , data_lensa){
		data_frame.find({} , function(err , data_frame){
			if( lens_left != undefined && lens_right != undefined && frame != undefined )
			{
				data_lensa2.find({_id:lens_right}, function(err , lens_right){
					data_lensa2.find({_id:lens_left}, function(err , lens_left){
						data_frame2.find({_id:frame} , function(err , frame_proc){
							console.log(frame_proc);
							var total = parseInt(lens_right[0].harga,10) + parseInt(lens_left[0].harga,10) + parseInt(frame_proc[0].harga,10)
							res.render("pages/transaksi/index.ejs" , {title : "Transaksi" ,
																  session_store:session_store ,
																  data_frame:data_frame ,
																  data_lensa:data_lensa ,
																  tmp_lens_right:lens_right , 
																  tmp_lens_left:lens_left ,
																  tmp_frame:frame_proc ,
																  total_harga: total ,
																  data:'ada'
																});

						})
					});
				});
			}else{
				console.log("masuk kemari");
				res.render("pages/transaksi/index.ejs" , {title : "Transaksi" ,
															  session_store:session_store ,
															  data_frame:data_frame ,
															  data_lensa:data_lensa ,
															  data:'kosong'
															});
			}
		})
	});

});


router.post("/" , Auth_mdw.is_admin , function( req , res , next ){
	session_store = req.session;
	//let id = req.params.id;
	//let lensa = req.sanitize('lensa');
	let id_left = req.sanitize('id_left')
	let id_right = req.body.id_right
	let id_frame = req.body.id_frame

	let left = req.body.left
	let lens_right = req.body.right
	let frame = req.body.frame_used
	let total_harga = req.body.total

	console.log("oke!");
	console.log("lensa kiri : " + left);
	console.log("id kiri : " + id_left);
	console.log("lensa kanan : " + lens_right);
	console.log("id kanan : " + id_right);
	console.log("frame : " + frame);
	console.log("id frame : " + id_frame);
	console.log("total harga : " + total_harga);


	data_lensa.find({_id:id_left}, function(err , lens_left){
		data_lensa2.find({_id:id_right}, function(err , lens_right){
			data_frame.find({_id:id_frame}, function(err , data_frame){			
				var stok_lens_left  = parseInt(lens_left[0].stock,10) - 1
				var stok_lens_right = parseInt(lens_right[0].stock,10) - 1
				var stok_frame 		= parseInt(data_frame[0].stock,10) - 1

				var newVal_lens_left = {
					$set : {
						  stock: stok_lens_left,
						}
				}

				var newVal_lens_right = {
					$set : {
						  stock: stok_lens_right,
						}
				}

				var newVal_frame = {
					$set : {
						  stock: stok_frame,
						}
				}

				data_lensa.findOneAndUpdate({'_id':id_left} , newVal_lens_left , function(err , data){
					if(err) throw err;
					data_lensa.findOneAndUpdate({'_id':id_right} , newVal_lens_right , function(err , data){
						if(err) throw err;
						data_frame2.findOneAndUpdate({'_id':id_frame} , newVal_frame , function(err , data){
							if(err) throw err;
							var trans = new data_transaksi({
								lensa_kiri: lens_left[0].lensa,
								lensa_kanan: lens_right[0].lensa,
								frame: data_frame[0].merk,
								total: total_harga
							});
							trans.save(function(err){
								if(err){
									console.log(err);
									res.redirect("/status");
								}else{
									console.log("oke");
									var status = new data_status({
										lensa_kiri: lens_left[0].lensa,
										lensa_kanan: lens_right[0].lensa,
										frame: data_frame[0].merk,
										status: "pending",
									});
									status.save(function(err){
										if(err){
											console.log(err);
										}else{
											console.log('oke!');
											res.redirect("/status");
										}
									})
								}
							})
						})
					})
				})
			});					
		});				
	});				

});


//router.get("/" , function( req , res , next){
//	let lens_left  = req.params.lens_left;
//	let lens_right = req.params.lens_right;
//	let frame 	   = req.params.frame;
//
//	console.log("frame : " + frame);
//
//	session_store = req.session;
//	data_lensa.find({}, function(err , data_lensa){
//		data_frame.find({} , function(err , data_frame){
///* shrinking another data */
//			data_lensa.find({}, function(err , data_lensa){
//				data_frame.find({} , function(err , data_frame){
//					res.render("pages/transaksi/index.ejs" , {title : "Transaksi" ,
//														  session_store:session_store ,
//														  data_frame:data_frame ,
//														  data_lensa:data_lensa });
//				})
//			});
//		})
//	});
//
//});




module.exports = router;
