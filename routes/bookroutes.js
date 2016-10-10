var express = require('express');
var router = express.Router();
var data = require('../variables.json');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/libraryapp';
var nav = {nav : [{title: 'author'},{title: 'books'},{title: 'date'}]};
var objectID = require('mongodb').ObjectID;

router.route('/books')
.get(function (req, res){
  mongo.connect(url, function ( err, db){
    var collection = db.collection('books');
collection.find({}).toArray(
  function (err, result)
  {
        res.render('index',{
        title: 'library tutorial',
        nav: nav.nav,
        books: result
      }) ;
  }
);
db.close();
});
});


router.route('/book')
    .get(function(req, res) {
        var id = new objectID(req.query.id);
        mongo.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id:id
            }, function(err, result) {
                console.log(err + '    ' + result);
                res.render('book', {
                title: 'library tutorial',
                nav: nav.nav,
                book: result
                });
                db.close();
            }
        );
    });
  });

module.exports = router;
