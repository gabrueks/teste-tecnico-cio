var test = require('tape')
var code = require('./crawl/code');
var router = require('./routes/index');
var supertest = require('supertest');
var mongoose = require('mongoose');
var keys = require('./secrets/keys')
require('./models/LinksModel');

mongoose.connect(keys.mongoDB);

test('Save to DB and crawl', (t) =>{
  t.assert(code.crawling('https://google.com.br') === true, "Correto.")
})

test('GET /', (t) => {
   supertest(app)
   .get('/')
   .expect(200)
   .end((err, res) =>{
   t.error(err, 'Sem erros')
   t.assert(res != undefined, "Correto")
   t.end()
  })
 })

 test('GET /db/1', (t) => {
    supertest(app)
    .get('/')
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'Sem erros')
    t.assert(res != undefined, "Correto")
    t.end()
   })
  })
