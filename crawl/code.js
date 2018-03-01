var exports = module.exports = {};
var mongo = require('../mongo/mongoUtils');
var request = require('request');
var cheerio = require('cheerio');

exports.crawling = function(url){
  request(url, function(err, resp, body){
    if(body != undefined){
      $ = cheerio.load(body);
      var list = []
      links = $('a');
      $(links).each(function(i, link){
        if($(link).attr('href')){
          if($(link).attr('href') != undefined){
            if($(link).attr('href').substring(0,5) == "https" || $(link).attr('href').substring(0,5) == "http:"){
              var url = $(link).attr('href');
              console.log(url)
              var urlBanco = new mongo({link : url});
              urlBanco.save();
            }
          }
        }
      })
    }if(resp != undefined && body == undefined){
      $ = cheerio.load(resp.body);
      var list = []
      links = $('a');
      $(links).each(function(i, link){
        if($(link).attr('href') != undefined){
          if($(link).attr('href').substring(0,5) == "https" || $(link).attr('href').substring(0,5) == "http:"){
            var url = $(link).attr('href');
            console.log(url)
            var urlBanco = new mongo({link : url});
            urlBanco.save();
          }
        }
      })
    }
  })
  return "saved!"
}
