// --- Require Dependencies ----------------------------------------------------

var fs = require('fs');
var koa = require('koa');
var router = require('koa-router');
var serve = require('koa-static');
var body = require('koa-body');

// --- Koa Setup ---------------------------------------------------------------

var app = koa();

app.use(serve('./client'));
app.use(body());
app.use(router(app));

// --- Create Servers ----------------------------------------------------------

app.get('/events', function*() {
  this.body = [
    { name: 'ENGL 101', days: 'MWF', time: 8 }
  ];
});

app.listen(3000);
console.log('server listening on port 3000');

