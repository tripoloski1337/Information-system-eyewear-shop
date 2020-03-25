var Auth = {
  check_login: function(req , res , next){
    if(!req.session.logged_in){
      return res.redirect('/login');
    }
    next();
  },
  is_admin: function(req,res,next){
    if(!req.session.admin){
      return res.redirect('/login');
    }
    next();
  },
  is_trainer: function(req,res,next){
    if(!req.session.trainer){
      return res.redirect('/');
    }
    next();
  }
}


module.exports = Auth;
