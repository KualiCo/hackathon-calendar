/**
 * @jsx React.DOM
 */

var  React = require('react');
var moment = require('moment');
var      _ = require('lodash');
var Collisions = require('./collisions');
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
      type: 'week',
      collisionDetected: Collisions.SIDE_BY_SIDE
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

    var children = _.isArray(this.props.children) ? this.props.children : [this.props.children];
    _.each(children, function (child) {
      var c = child.props;
      var start = moment(c.start);
      var end = moment(c.end);
      var day = start.day();
      var time = start.hours() * 60 + start.minutes();
      var duration = (end.hours() * 60 + end.minutes()) - time;

      c.left = 'calc(' + (day * (100 / 7) + '%') + ' + 5px)'
      c.width = 'calc(100% / 7 - 10px)';
      c.top = (time / (24 * 60)) * 100 + '%';
      c.height = (duration / (24 * 60)) * 100 + '%';
      c.visible = true;

      var collisions = _.filter(children, function (child2) {
        var c2 = child2.props;
        return (c.start < c2.end && c.end > c2.start);
      });
      if (collisions.length > 1) {
        collisions.sort(function (a, b) {
          return (a.props.start - b.props.start) || (a.props.key - b.props.key);
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
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }

});

module.exports = Calendar;
