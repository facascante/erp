var passport = require('passport'),
	BearerStrategy = require('passport-http-bearer').Strategy,
	model = require("../libraries/db.mysql.js").model;


passport.use(new BearerStrategy({},function(token,done){
	process.nextTick(function () {
		model.command("select * from erp_security_token where auth_token = '"+ token +"'",function(err,user){
			if (err) { return done(err); }
	        if (!user) { return done(null, false); }
	        return done(null, user);
		});
	});
}));