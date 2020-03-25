var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var data_frame = require("../models/model.frame");

var secret = "arsalan";
var session_store;
var Auth_mdw = require('../middlewares/auth');

router.get("/" , Auth_mdw.is_admin , function( req , res , next){
	session_store = req.session;
	data_frame.find({}, function(err , data){
		res.render("pages/data_frame/index.ejs" , {title : "Data Frame" , session_store:session_store , data_frame:data});
	})
})

router.get("/add" , Auth_mdw.is_admin , function( req , res , next){
	session_store = req.session;
	res.render("pages/data_frame/add.ejs" , {title : "Add Data Frame" , session_store:session_store})
})

router.get("/edit/:id" , Auth_mdw.is_admin , function( req , res , next ){
	session_store = req.session;
	let id = req.params.id;
	data_frame.find({_id:id}, function(err , data){
		if(err) throw err;
		console.log(data);
	    console.log("error : " + err);
	    if( data.length > 0 ){
	      res.render("pages/data_frame/edit.ejs", {title:"edit data frame " ,
	                                            session_store: session_store,
	                                            data_frame:data});
	    }
	});
})

router.post("/edit/:id" , Auth_mdw.is_admin , function( req , res , next ){
	session_store = req.session;
	let id = req.params.id;
	let merk = req.sanitize('merk');
	let price = req.sanitize('harga');
	let stock = req.sanitize('stock');	
	
	var newVal = {
					$set : {
						  merk: merk,
						  price: price,
						  stock: stock,
						}
				}

    data_frame.findOneAndUpdate({'_id':id} , newVal , function(err , data){
		if(err) throw err;
		res.redirect("/data_frame")
	})

})


router.get("/del/:id", Auth_mdw.is_admin , function(req , res , next){
  var session_store = req.session;
  let id = req.params.id;
  data_frame.findByIdAndRemove({_id:id}, function(err , data){
    if(err) throw err;
    res.redirect("/data_frame");
  })
})

router.post("/add" , Auth_mdw.is_admin , function( req , res , next ){
	session_store = req.session;


	var merk = req.sanitize('merk');
	var price = req.sanitize('harga');
	var stock = req.sanitize('stock');
	console.log("data : " + merk);

	var frame = new data_frame({
		merk: merk,
		harga: price,
		stock: stock
	});

	frame.save(function(err){
		if(err){
			console.log(err);
			res.redirect("/data_frame");
		}else{
			console.log("oke");
			res.redirect("/data_frame");
		}
	})
});



module.exports = router;
