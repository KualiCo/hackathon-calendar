var events = require('../models/events.js');

module.exports = function (app) {
  app.get('/events', function*() {
    this.body = yield events.getAll();
  });
};
