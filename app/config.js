var path = require('path');
var mongoose = require('mongoose');

// var filename = path.join(__dirname, '../db/shortlydb');

mongoose.connect('mongodb://localhost/shortlydb' , function (err) {
  if (err) {
    throw err;
  }
}); //TODO: check if server-config

var db = mongoose.connection;

db.once('open', () => {
  console.log('Connected');
});

// db.on('error', function () {
//   console.log('error');
// });
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// var urls = mongoose.model('link', urlsSchema);


module.exports = db;
