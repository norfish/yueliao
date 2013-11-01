var mongoClient = require('./db');
var crypto = require('crypto');
var settings = require('../settings');

function Post(post) {
  this.name = post.name;
  this.title = post.title;
  this.art = post.art;
};

module.exports = Post;


Post.prototype.save = function(callback){
	var now = new Date();
	var post = {
		name: this.name,
		title: this.title,
		time: now,
	}
}

//存储用户信息
User.prototype.save = function(callback) {
  var md5 = crypto.createHash('md5'),
      email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
      head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
  //要存入数据库的用户信息文档
  var user = {
      name: this.name,
      password: this.password,
      email: this.email,
      head: head
  };
  //打开数据库
  mongoClient.open(function (err, client) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    var db = client.db(settings.db);
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongoClient.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {safe: true}, function (err, user) {
        mongoClient.close();//关闭数据库
        callback(null, user[0]);//成功！err 为 null，并返回存储的文档
      });
    });
  });
};

//读取用户信息
User.get = function(name, callback) {
  //打开数据库
  mongoClient.open(function (err, client) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }

    var db = client.db(settings.db);
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongoClient.close();//关闭数据库
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function(err, user){
        mongoClient.close();//关闭数据库
        if (user) {
          return callback(null, user);//成功！返回查询的用户信息
        }
        callback(err);//失败！返回 err 信息
      });
    });
  });
};
