var config = require('../config/ftp-config');
var dbConfig = require('../config/db');
// Gulp
var gulp = require('gulp');
var pipeErrorStop = require('pipe-error-stop');
var del = require('del');
var vp= require('vinyl-paths');
var sftp = require('gulp-sftp');
//Mongo
var mongoose = require('mongoose');
var schema = dbConfig.schema;
var Form = mongoose.model('Form',schema);
var conn = mongoose.connection;
//Utility
var R = require('ramda');
var csvwriter = require ('csvwriter');
var fs = require ('fs');
var f = new Form;
var debug = require('debug')('ftp');

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {
  debug('connection ok!');
  //seeding, for development.
  if(process.env.SEED === 'yes') {
    debug('seeding...');
    R.times(function() {
      f.save();
      f = new Form;
    },10);
  }
});

mongoose.connect(dbConfig.location);
var path = '/tmp/';

function checkData() {
  //get the registers
  var docsId=[];
  Form.find({sent: false}, function (err, docs) {
    if(!err && docs.length > 0) {
      //convert objects to csv
      csvwriter(JSON.stringify(docs), function (err, csv) {
        if (err) {
          debug("error creating csv file: "+err);
        }
        else {
          //save the csv file
          fs.writeFile(path + Date.now() + '-table.csv', csv, function (err) {
            if (err) {
              throw err;
            }
            else {
              //update sent status in docs
              docs.forEach(function(doc) {
                docsId.push(doc.id);
              });
              Form.update({id: {$in: docsId}}, { $set: { sent: true }}, {multi: true}, function (err) {
                if (!err) {
                  debug(docs.length+ " registers added to CSV file");
                  gulp.start('upload');
                }
              });
            }
          });
        }
      });
    }
    else if(err) {
      debug("error finding unsent items: " +err);
    }
  });
}
gulp.task('upload', function () {
  return gulp.src(path + '*.csv')
    .pipe(pipeErrorStop(sftp(config.ftpOptions)))
    .pipe(vp(function(a) {
      del(a,{force: true});
    }));
});

module.exports = function () {
  setInterval(function() {
    checkData();
  },config.checkDelay);
};
