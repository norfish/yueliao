var settings = require('../settings'),
	Db = require('mongodb').Db,
	MongoClient = require('mongodb').MongoClient,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;

//module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));

var mongoClient = new MongoClient(new Server(settings.host, Connection.DEFAULT_PORT, {}));

/*mongoClient.open(function(err, mongoClient) {
  var blog = mongoClient.db(settings.db);

  mongoClient.close();
});*/

module.exports = mongoClient;