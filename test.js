var	User   = require('./models/user.js');

var express = require('express');
var http    = require('http');
var path    = require('path');

var app = express();

app.get('/', function (req, res){
	var user = new User({
		"name": "leon",
		"password": "123123",
		"email": "12@12.com"
	});
	User.get(user.name, function (err, user){
		if(user){
			res.send("user");
		}
	})
	
});

app.set('port', 1306);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});