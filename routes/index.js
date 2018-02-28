var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var crawl = require('../crawl/code');
var searchTerm = 'screen+scraping';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/lookup', function(req, res, next){
  var url = req.body.url + "/search?q=" + searchTerm;
  crawl.crawling(url);
});

module.exports = router;
