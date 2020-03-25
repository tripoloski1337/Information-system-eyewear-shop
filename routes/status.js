var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var data_status = require("../models/model.status");
var data_lensa = require("../models/model.lensa");
var data_frame = require("../models/model.frame");
var secret = "arsalan";
var session_store;
var Auth_mdw = require('../middlewares/auth');


router.get("/" , Auth_mdw.is_admin , function( req , res , next){
	session_store = req.session;
	data_status.find({}, function(err , data_status){
		res.render("pages/status/index.ejs" , {title : "status" ,
											   session_store:session_store , 
											   data_status:data_status
											})
	});
});

router.get("/:id/done" , Auth_mdw.is_admin , function( req , res , next){
	let id = req.params.id;
	var newVal = {
					$set : {
						  status: "done",
						}
				}
	data_status.findOneAndUpdate({'_id':id} , newVal , function(err , data){
		res.redirect("/status");
	});
});

router.get("/:id/onprog" , Auth_mdw.is_admin , function( req , res , next){
	let id = req.params.id;
	var newVal = {
					$set : {
						  status: "on progress",
						}
				}
	data_status.findOneAndUpdate({'_id':id} , newVal , function(err , data){
		res.redirect("/status");
	});
});

router.get("/:id/del/:kiri/:kanan/:frame" , Auth_mdw.is_admin , function( req , res , next){
	var session_store = req.session;
  	let id = req.params.id;
  	let lef = req.params.kiri;
  	let rig = req.params.kanan;
  	let fra = req.params.frame;
  	data_status.findByIdAndRemove({_id:id}, function(err , data){
  	    if(err) throw err;
  	  	console.log(fra)
  	  	data_frame.find({merk:fra}, function(err , data){
  	  		if(err) throw err;
  	  		var new_frame_stock = (Number(data[0].stock)+1)
  	  		var newVal1 = {
					$set : {
						  stock: new_frame_stock,
						}
				}
			data_frame.findOneAndUpdate({'merk':fra} , newVal1 , function(err , data){
				if(err) throw err;
				console.log("oke update frame stock")
				data_lensa.find({lensa:lef}, function(err , data_lensa_rec){
					if(err) throw err;
					var new_lensaLEFT_stock = (Number(data_lensa_rec[0].stock) + 1);
					var newVal2 = {
						$set : {
							  stock: new_lensaLEFT_stock,
							}
					}
					console.log(lef)
					console.log(data_lensa)
					data_lensa.findOneAndUpdate({'lensa':lef} , newVal2 , function(err , data2){
						if(err) throw err;
						console.log('oke lens left updated')
						//res.redirect("/status");
						data_lensa.find({lensa:rig}, function(err , data_lensa_rec2){
							if(err) throw err;
							var new_lensaRIGHT_stock = (Number(data_lensa_rec2[0].stock) + 1);
							var newVal3 = {
								$set : {
									  stock: new_lensaRIGHT_stock,
									}
							}
							console.log(rig)
							console.log(data_lensa)
							data_lensa.findOneAndUpdate({'lensa':rig} , newVal3 , function(err , data2){
								if(err) throw err;
								console.log('oke lens rig updated')
								res.redirect("/status");
							})
						});
					})
				});
  	  			
			})
		})
  	})
});


module.exports = router;
