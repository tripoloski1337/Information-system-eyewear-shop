var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var data_frame = require("../models/model.frame");
var session_store;
/**	
	password  adalah 12345678
**/
let password = 12345678;

router.get("/" , function( req , res , next){
	session_store = req.session;
	data_frame.find({}, function(err , data){
		res.render("pages/login.ejs" , {title : "login" , session_store:session_store , data_frame:data});
	})
})

router.post("/" , function( req , res , next ){
	session_store = req.session;
	let pass = req.sanitize("password");
	console.log("password : " + pass);
	if( pass == password ){
		console.log("logged in..");
		//session_store.admin = "logged";
		session_store.admin = true;
		res.redirect("/");
	}
})

module.exports = router;
