var mysql = require('mysql');
var config = require('../config.json');
var pool = mysql.createPool(config.database);
var model = {
		command : function(statement,cb){
			pool.getConnection(function(err,connection){
				if(connection){
					connection.query(statement,function(err,result){
						if(result){
							connection.end();
							cb(null,result);
						}
						else{
							connection.end();
							cb(err);
						}
					});
				}
				else if(err){
					connection.end();
					cb(err);
				}
				else{
					cb({"Message":"Unknown Database Error!"});
				}
			});
		}
};

module.exports.model = model;
module.exports.lib = function(req,res,next){
	req.model = model;
	return next();
};
