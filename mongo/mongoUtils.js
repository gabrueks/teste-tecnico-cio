var exports = module.exports = {};
var mongoose = require('mongoose');
var assert = require('assert');

mongoose.connect('mongodb://admin:WVKJVYLNGCTLKWFA@sl-us-south-1-portal.15.dblayer.com:31775,sl-us-south-1-portal.14.dblayer.com:31775/compose?authSource=admin&ssl=true');

var Links = mongoose.model('links', { link: String })

module.exports = Links;
