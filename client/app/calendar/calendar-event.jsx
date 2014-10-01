/**
 * @jsx React.DOM
 */

var  React = require('react/addons');
var moment = require('moment');
var      _ = require('lodash');

var CalendarEvent = React.createClass({

  propTypes: {
    id: React.PropTypes.number,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      id: 0,
      onClick: function () {}
    };
  },

  onClick: function() {
    this.props.onClick(this.props.id);
  },

  render: function() {
    var divStyle = _.pick(this.props, ['left', 'top', 'width', 'height', 'visible']);
    var classes = React.addons.classSet({
      'kc-event': true,
      'kc-conflicted': this.props.conflicted
    });
    return (
      <div style={divStyle} className={classes} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = CalendarEvent;
