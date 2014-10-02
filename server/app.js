// --- Require Dependencies ----------------------------------------------------

var     fs = require('fs');
var moment = require('moment');
var config = require('config');
var    koa = require('koa');
var router = require('koa-router');
var  serve = require('koa-static');
var   body = require('koa-body');

// --- Koa Setup ---------------------------------------------------------------

var app = koa();

app.use(serve(config.staticPath));
app.use(body());
app.use(router(app));

// --- Load Routes -------------------------------------------------------------

fs.readdirSync(__dirname + '/routes').forEach(function (filename) {
  if (filename === '.DS_Store') return;
  require('./routes/' + filename)(app);
});

// --- Create Servers ----------------------------------------------------------

app.listen(config.port);
console.log('server listening on port ' + config.port);
