var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var session_store;

router.get("/" , function( req , res , next){
	req.session = 0;
	session_store = req.session;
	res.render("pages/index.ejs" , {title : "Home" , session_store:session_store})
})



module.exports = router;
