var Promise = require('bluebird');

var courseTitles = 'ENGL,CHEM,SCREAM,WOOT,MATH,CS'.split(',');

var db = [];

for (var i = 0; i < 10; ++i) {
  db.push(_createCourse());
}

// --- Exported Functions ------------------------------------------------------

exports.getAll = function () {
  return Promise.resolve(db);
};

// --- Private Functions -------------------------------------------------------

function _createCourse() {
  var prefix = courseTitles[Math.floor(Math.random() * courseTitles.length)];
  var number = Math.floor(Math.random() * 899) + 100
  return {
    title: prefix + ' ' + number,
    dates: _getDates()
  };
}

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
