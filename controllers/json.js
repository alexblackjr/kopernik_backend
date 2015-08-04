/*
 *
 * Created by cristian on 23/02/15.
 * controller for receiving data from Kopernik's chrome extension
 */
var dbConfig = require('../config/db');
var mongoose = require('mongoose');
var schema = dbConfig.schema;
var Form = mongoose.model('Form',schema);
var conn = mongoose.connection;
var debug = require('debug')('json');

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {
  debug('connection ok!');
});
mongoose.connect(dbConfig.location);

module.exports = function(req, res, next) {
  debug(req.body);
  if(req.body.apikey === dbConfig.apikey) {
    delete req.body.apikey;
    var f = new Form(req.body);
    f.save(function (err, doc) {
      if (!err) {
        res.json(doc);
      }
    });
  }
  else {
    res.status(500);
    debug('API key invalid:'+req.body.apikey);
  }
};
