var exports = module.exports = {};
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//Variaveis do banco de dados
var urlConnectionMongo = "mongodb://admin:WVKJVYLNGCTLKWFA@sl-us-south-1-portal.15.dblayer.com:31775,sl-us-south-1-portal.14.dblayer.com:31775/compose?authSource=admin&ssl=true"
var dbNome = "compose";

//Insert
exports.insert = function(parametroInsert){
  MongoClient.connect(urlConnectionMongo, (err, client) => {
    var collection = client.db(dbNome).collection('links');
    collection.insert({link: parametroInsert});
    client.close();
  });
}
