var Promise = require('bluebird');

var db = ['ENGL 101', 'CHEM 123', 'SCREAM 400', 'WOOT 777'].map(function (title) {
  return {
    title: title,
    dates: _getDates()
  };
});

// --- Exported Functions ------------------------------------------------------

exports.getAll = function () {
  return Promise.resolve(db);
};

// --- Private Functions -------------------------------------------------------

function _getDates() {
  var num = Math.random();
  if (num < 0.15) {
    var arr = [moment().day(Math.floor(Math.random() * 7)).format('dddd')];
    return _getDatePairs(arr, 3);
  } else if (num < 0.6) {
    var arr = ['Monday', 'Wednesday', 'Friday'];
    return _getDatePairs(arr, 1);
  } else {
    var arr = ['Tuesday', 'Thursday'];
    return _getDatePairs(arr, 1);
  }
}

function _getDatePairs(arr, length) {
  var hour = Math.floor(Math.random() * 10) + 8;
  var date = moment().startOf('day');
  return arr.map(function (weekday) {
    var start = moment(date).day(weekday).hour(hour);
    return {
      start: +start,
      end: +start.add(length, 'hours')
    };
  });
}
