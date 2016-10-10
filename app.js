var express = require('express');
var nunjucks = require('nunjucks');
var data =   require('./variables.json');
var app = express();
var bookrouter = require('./routes/bookroutes.js');
var adminrouter = require('./routes/adminroutes.js');
var port = process.env.PORT|| 5000;

//Locate all static content - css, js
app.use(express.static('public'));

// set up router for books.
app.use('/', bookrouter);
app.use('/admin', adminrouter);
// create default view engine, this doesn't work without nunjucks configure.
app.set('view engine', 'njk');

// configure nunjucks
nunjucks.configure('./src/views/template', {
  autoescape: true,
  express: app});

// default home page.
app.get('/', function (req, res){
res.render('index', data);
});

//start instance of server
app.listen(port, function (err){
console.log('running server on port ' + port );
});
