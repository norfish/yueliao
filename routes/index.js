'use strict';

var regist = require('./reg'); 
var login = require('./login');

module.exports = function(app){
	app.get('/', function (req, res){
		req.flash('info', 'hi there');
		res.render('index', { title: '主页' ,
							error: req.flash('error'),
							success: req.flash('success')
		});
	});
	
	app.get('/reg', function (req, res){
		res.render('reg', { title: '注册', message: req.flash('error') });
	});

	app.post('/reg', function (req, res){
		regist(req, res);
	});

	app.get('/login', checkNotLogin);
	app.get('/login', function (req, res){
		console.log('get')
		res.render('login', { title: '登录', message: req.flash('error')});
	});

	app.post('/login', checkNotLogin);
	app.post('/login', function (req, res){
		console.log('login')
		login(req, res);
	});

	app.get('/post', checkLogin);
	app.get('/post', function (req, res){
		res.render('post', { title: '发表' });
	});

	app.post('/post', checkLogin);
	app.post('/post', function (req, res){

	});

	app.get('/logout', function (req, res){
		req.session.user = null;
		req.flash('success', '退出成功');
		res.redirect('/');
	});

	app.get('/blog', function (req, res){
		res.render('blog', { title: '存档' });
	});

	app.post('/blog', function (req, res){
	})
};

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!'); 
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录!'); 
    res.redirect('back');
  }
  next();
}
