var exports = module.exports = {};
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

const links = mongoose.model('links');


exports.crawling = function(url){
  request(url, function(err, resp, body){
    if(body != undefined){
      $ = cheerio.load(body);
      var list = []
      linking = $('a');
      $(linking).each(function(i, link){
        if($(link).attr('href')){
          if($(link).attr('href') != undefined){
            if($(link).attr('href').substring(0,5) == "https" || $(link).attr('href').substring(0,5) == "http:"){
              var url = $(link).attr('href');
              var urlBanco = new links({link : url});
              urlBanco.save();
              return true
            }
          }
        }
      })
    }if(resp != undefined && body == undefined){
      $ = cheerio.load(resp.body);
      var list = []
      linking = $('a');
      $(linking).each(function(i, link){
        if($(link).attr('href') != undefined){
          if($(link).attr('href').substring(0,5) == "https" || $(link).attr('href').substring(0,5) == "http:"){
            var url = $(link).attr('href');
            console.log(url)
            var urlBanco = new links({link : url});
            urlBanco.save();
            return true
          }
        }
      })
    }
  })
  return false
}
