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
	session_store.admin = false;
	res.redirect("/");
})


module.exports = router;
