var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var data_lensa = require("../models/model.lensa");
var secret = "arsalan";
var session_store;
var Auth_mdw = require('../middlewares/auth');

router.get("/" , Auth_mdw.is_admin , function( req , res , next){
	session_store = req.session;
	data_lensa.find({}, function(err , data){
		res.render("pages/data_lensa/index.ejs" , {title : "Data lensa" , session_store:session_store , data_lensa:data});
	})
})


router.get("/edit/:id" , Auth_mdw.is_admin , function( req , res , next ){
	session_store = req.session;
	let id = req.params.id;
	data_lensa.find({_id:id}, function(err , data){
		if(err) throw err;
		console.log(data);
	    console.log("error : " + err);
	    if( data.length > 0 ){
	      res.render("pages/data_lensa/edit.ejs", {title:"edit data lensa" ,
	                                            session_store: session_store,
	                                            data_lensa:data});
	    }
	});
})

router.post("/edit/:id" , Auth_mdw.is_admin , function( req , res , next ){
	session_store = req.session;
	let id = req.params.id;
	let lensa = req.sanitize('lensa');
	let price = req.sanitize('harga');
	let stock = req.sanitize('stock');	
	
	var newVal = {
					$set : {
						  lensa: lensa,
						  harga: price,
						  stock: stock,
						}
				}

    data_lensa.findOneAndUpdate({'_id':id} , newVal , function(err , data){
		if(err) throw err;
		res.redirect("/data_lensa")
	})

})

router.get("/del/:id", Auth_mdw.is_admin , function(req , res , next){
  var session_store = req.session;
  let id = req.params.id;
  data_lensa.findByIdAndRemove({_id:id}, function(err , data){
    if(err) throw err;
    res.redirect("/data_lensa");
  })
})

router.get("/add" , Auth_mdw.is_admin , function( req , res , next){
	session_store = req.session;
	res.render("pages/data_lensa/add.ejs" , {title : "Add Data lensa" , session_store:session_store})
})

router.post("/add" , function( req , res , next ){
	session_store = req.session;


	var lens = req.sanitize('lensa');
	var price = req.sanitize('harga');
	var stock = req.sanitize('stock');
	console.log("data : " + lens);

	var lens = new data_lensa({
		lensa: lens,
		harga: price,
		stock: stock
	});

	console.log("oke");

	lens.save(function(err){
		if(err){
			console.log(err);
			res.redirect("/data_lensa");
		}else{
			console.log("oke");
			res.redirect("/data_lensa");
		}
	})
});


module.exports = router;
