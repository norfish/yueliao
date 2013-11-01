var crypto = require('crypto');
var User   = require('../models/user');
/*
 * GET home page.
 */
module.exports = login;

function login(req, res){
	//res.render( 'login', {title: '注册'} );
	//console.log("123")
	var name = req.body.name,
		password = req.body.password;
	console.log(password);
	var md5 = crypto.createHash('md5'),
		password = md5.update(password).digest('hex');

	if(name === "" || password === ""){
		console.log("err")
		req.flash('error', '用户名或密码不能为空！');
		return res.redirect('/login');
	}

	User.get(name, function(err, user){
		if(!user){
			req.flash('error', '用户名不存在');
			return res.redirect('/login');
		}

		if(user.password !== password){
			req.flash('error', '密码不正确');
			return res.redirect('/login');
		}

		req.session.user = user;
		req.flash('success', '登录成功');
		res.redirect('/');
	})


};
