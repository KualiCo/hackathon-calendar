/**
 * @jsx React.DOM
 */

var  React = require('react');
var moment = require('moment');
var      _ = require('lodash');
require('./style');

var _days = _.map(_.range(7), function (num) {
  return moment().day(num).format('dddd');
});

var _times = _.map(_.range(24), function (num) {
  return (num % 12 || 12) + (num < 12 ? ' am' : ' pm');
});

var Calendar = React.createClass({

  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      type: 'week'
    };
  },

  render: function() {
    var times = _times.map(function (time) {
      return (
        <div>{time}</div>
      );
    });

    var days = _days.map(function (day) {
      return (
        <div>{day}</div>
      );
    });

    _.each(this.props.children, function (child) {
      var start = moment(child.props.start);
      var end = moment(child.props.end);
      var day = start.day();
      var time = start.hours() * 60 + start.minutes();
      var duration = (end.hours() * 60 + end.minutes()) - time;
      child.props.left = 'calc(' + (day * (100 / 7) + '%') + ' + 5px)'
      child.props.top = (time / (24 * 60)) * 100 + '%';
      child.props.height = (duration / (24 * 60)) * 100 + '%';
    });

    return (
      <div className="kc-calendar">
        <div className="kc-times">{times}</div>
        <div className="kc-calendar-content">
          <div className="kc-days">{days}</div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }

});

module.exports = Calendar;
