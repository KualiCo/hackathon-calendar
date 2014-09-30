/**
 * @jsx React.DOM
 */

var  React = require('react');
var      _ = require('lodash');
var moment = require('moment');

var days = _.map(_.range(7), function (num) {
  return moment().day(num);
});

var Week = React.createClass({

  getDefaultProps: function() {
    return {
      events: []
    };
  },

  render: function() {
    var times = [];

    var start = moment().startOf('day');
    var end = moment().endOf('day');

    for (var m = start; m.isBefore(end); m.add(1, 'hour')) {
      times.push(
        <div>{m.format('hh a')}</div>
      );
    }
    var dates = days.map(function (date) {
      var events = _.filter(this.props.events, function (e) {
        var test = moment(e.dates.start);
        return test.day() === date.day();
      });
      return (
        <Day title={date.format('dddd')} events={events}/>
      );
    }.bind(this));

    return (
      <div className="week">
        <div className="times">
          {times}
        </div>
        {dates}
      </div>
    );
  }

});

module.exports = Week;
