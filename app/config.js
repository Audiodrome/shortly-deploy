var path = require('path');
// var pg = require('pg');
var dburl = 'postgres://ryriocrvhqrhsa:d9080bd2743d839c1a4788b339ce92104f9080e799c507a9ae358e2d86b049b9@ec2-23-23-221-255.compute-1.amazonaws.com:5432/d5kvblb7jtshq2';
var knex = require('knex')({
  client: 'pg',
  connection: dburl + '?ssl=true',
  searchPath: 'knex,public'
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
