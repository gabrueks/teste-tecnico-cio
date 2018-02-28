var exports = module.exports = {};
var mongo = require('../mongo/mongoUtils');
var request = require('request');
var cheerio = require('cheerio');

exports.crawling = function(url){
  request(url, function(err, resp, body){
    $ = cheerio.load(body);
    var list = []
    links = $('a');
    $(links).each(function(i, link){
      if($(link).attr('href').substring(0,5) == "https" || $(link).attr('href').substring(0,5) == "http:"){
        mongo.insert($(link).attr('href'));
        console.log('\n' + $(link).attr('href'));
      }
    })
  })
}
