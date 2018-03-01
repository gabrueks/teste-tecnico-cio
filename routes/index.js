var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var mongo = require('../mongo/mongoUtils');
var crawl = require('../crawl/code');
var searchTerm = 'screen+scraping';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Crawler' });
});

router.get('/db/:id', function(req, res, next) {
  var num = req.params.id;
  var list = [];
  mongo.find({}).skip(num * 25).limit(25).exec( function (err, docs) {
    for(var countAux = 0; countAux < num * 25; countAux++){
      list.push(docs[countAux]);
    }
    if(num == 1){
      res.render('data', {list: list, number: num - 1, title : 'Banco de dados', pager: num});
    }else{
      res.render('data', {list: list, number: (num - 1) * 25, title: 'Banco de dados', pager: num});
    }
  })
})

router.post('/lookup', function(req, res, next){
  var url = req.body.url + "/search?q=" + searchTerm;
  crawl.crawling(url);

  mongo.find({}, function(err, docs) {
    //2 para não quebrar e ficar muito tempo, mas pode ser aumentado. Aqui você pode aumentar o search
     for(var count = 0; count < 2; count++){
       console.log(docs[count].link.split("'").pop() + "/search?q=" + searchTerm);
       crawl.crawling(docs[count].link.split("'").pop() + "/search?q=" + searchTerm);
     }
     res.redirect('/db/1');
  });
});

module.exports = router;
