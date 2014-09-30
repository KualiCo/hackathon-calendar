/**
 * @jsx React.DOM
 */

var  React = require('react');
var moment = require('moment');
var      _ = require('lodash');

var CalendarEvent = React.createClass({

  getDefaultProps: function() {
    return {
      source: {},
      showDetails: false
    };
  },

  render: function() {
    var divStyle = {
      left: this.props.left,
      top: this.props.top,
      height: this.props.height
    };

    return (
      <div style={divStyle} className="kc-event">
        {this.props.children}
      </div>
    );
  }

});

module.exports = CalendarEvent;
