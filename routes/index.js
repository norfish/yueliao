'use strict';

var regist = require('./reg'); 

module.exports = function(app){
	app.get('/', function (req, res){
		req.flash('info', 'hi there');
		res.render('index', { title: '主页' });
	});

	app.get('/reg', function (req, res){
		res.render('reg', { title: '注册',
												message: req.flash('error')
						});
	});

	app.post('/reg', function (req, res){
		regist(req, res);
	});

	app.get('/login', function (req, res){
		res.render('login', { title: '登录' });
	});

	app.post('/login', function (req, res){
	});

	app.get('/post', function (req, res){
		res.render('post', { title: '发表' });
	});

	app.post('/post', function (req, res){

	});

	app.get('/logout', function (req, res){
		
	});

	app.get('/blog', function (req, res){
		res.render('blog', { title: '存档' });
	});

	app.post('/blog', function (req, res){
	})
};
