/**
 * @jsx React.DOM
 */

var  React = require('react');
var moment = require('moment');
var      _ = require('lodash');
var Collisions = require('./collisions');
require('./style');

var NUM_DAYS = 7;
var NUM_TIMES = 24;

var _days = _.map(_.range(NUM_DAYS), function (num) {
  return moment().day(num).format('dddd');
});

var _times = _.map(_.range(NUM_TIMES), function (num) {
  return (num % 12 || 12) + (num < 12 ? ' am' : ' pm');
});

var Calendar = React.createClass({

  propTypes: {
    collisionDetected: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      collisionDetected: Collisions.SIDE_BY_SIDE
    };
  },

  render: function() {
    var times = _times.map(function (time, i) {
      var divStyle= { height: 'calc(100% / ' + NUM_TIMES + ')' };
      return (
        <div style={divStyle} key={'kc-time-' + i}>{time}</div>
      );
    });

    var days = _days.map(function (day, i) {
      var divStyle = { width: 'calc(100% / ' + NUM_DAYS + ')' };
      return (
        <div style={divStyle} key={'kc-day-' + i}>{day}</div>
      );
    });

    var children = [].concat(this.props.children);
    _.each(children, function (child) {
      var c = child.props;
      var start = moment(c.start);
      var end = moment(c.end);
      var day = start.day();
      var time = start.hours() * 60 + start.minutes();
      var duration = (end.hours() * 60 + end.minutes()) - time;

      c.left = day * 100 / NUM_DAYS + '%';
      c.width = 100 / NUM_DAYS + '%';
      c.top = time / NUM_TIMES / 60 * 100 + '%';
      c.height = duration / NUM_TIMES / 60 * 100 + '%';
      c.visible = true;

      var collisions = _.filter(children, function (child2) {
        var c2 = child2.props;
        return (c.start < c2.end && c.end > c2.start);
      });
      if (collisions.length > 1) {
        collisions.sort(function (a, b) {
          return (a.props.start - b.props.start);
        });
        var pos = _.indexOf(collisions, child);
        this.props.collisionDetected(c, pos, collisions);
      }
    }.bind(this));

    return (
      <div className="kc-calendar">
        <div className="kc-times">{times}</div>
        <div className="kc-calendar-content">
          <div className="kc-days">{days}</div>
          <div className="kc-events">{this.props.children}</div>
        </div>
      </div>
    );
  }

});

module.exports = Calendar;
