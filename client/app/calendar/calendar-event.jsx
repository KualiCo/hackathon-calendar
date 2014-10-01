/**
 * @jsx React.DOM
 */

var  React = require('react');
var moment = require('moment');
var      _ = require('lodash');

var CalendarEvent = React.createClass({

  render: function() {
    var divStyle = _.pick(this.props, ['left', 'top', 'width', 'height', 'visible']);

    return (
      <div style={divStyle} className="kc-event">
        {this.props.children}
      </div>
    );
  }

});

module.exports = CalendarEvent;
