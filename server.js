require ('dotenv').config();
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var autoprefixer = require('express-autoprefixer');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var app = express();

// configuration ===========================================
var db = process.env.LOCAL_DB_URL;
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || db);

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(sassMiddleware({
  src: __dirname + '/sass',
  dest: path.join(__dirname, '/public/css'),
  // debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));
app.use(autoprefixer({browsers: 'last 2 versions', cascade: false}));
app.use(express.static(path.join(__dirname, 'public')));

// routes ==================================================
require('./app/routes')(app);

// start app ===============================================
app.listen(port);
console.log('the sounds are falling');

// expose app ===============================================
exports = module.exports = app;