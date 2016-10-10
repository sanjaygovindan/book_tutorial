var express = require('express');
var adminrouter = express.Router();
var mongo = require('mongodb').MongoClient;
var books = require('../variables.json').books;
var url = 'mongodb://localhost:27017/libraryapp';


adminrouter.route('/addbooks')
    .get(function(req, res) {
        mongo.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.insertMany(books, function(err, results) {
                res.send(results);
                db.close();

            });

        });

    });

module.exports = adminrouter;
