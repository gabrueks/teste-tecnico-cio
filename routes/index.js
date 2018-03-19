var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');
var crawl = require('../crawl/code');
var router = express.Router();

var links = mongoose.model('links');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Crawler' });
});

router.get('/db/:id', function(req, res, next) {
  var num = req.params.id;
  var list = [];
  if(num == 1){
    links.find({}).limit(25).exec( function (err, docs) {
      for(var countAux = 0; countAux < num * 25; countAux++){
        list.push(docs[countAux]);
      }
      if(docs.length != 0){
        if(num == 1){
          res.render('data', {list: list, number: num - 1, title : 'Banco de dados', pager: num});
        }else{
          res.render('data', {list: list, number: (num - 1) * 25, title: 'Banco de dados', pager: num});
        }
      }else{
        res.render('emptyDB');
      }
    })
  }else{
    links.find({}).skip(num * 25).limit(25).exec( function (err, docs) {
      for(var countAux = 0; countAux < num * 25; countAux++){
        list.push(docs[countAux]);
      }
      if(docs.length != 0){
        if(num == 1){
          res.render('data', {list: list, number: num - 1, title : 'Banco de dados', pager: num});
        }else{
          res.render('data', {list: list, number: (num - 1) * 25, title: 'Banco de dados', pager: num});
        }
      }else{
        res.render('emptyDB');
      }
    })
  }
})

router.post('/lookup', function(req, res, next){
  console.log(req.body.url)
  var term = '/search?q=';
  var searchTerm = 'screen+scraping';
  var url = req.body.url + term + searchTerm;
  crawl.crawling(url);

  links.find({}, function(err, docs) {
    //2 para não quebrar e ficar muito tempo, mas pode ser aumentado. Aqui você pode aumentar o search
    if(docs[0] != undefined){
       for(var count = 0; count < 2; count++){
         crawl.crawling(docs[count].link.split("'").pop() + term + searchTerm);
       }
    }
  });
});

module.exports = router;
