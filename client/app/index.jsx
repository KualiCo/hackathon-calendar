/**
 * @jsx React.DOM
 */

var React = window.React = require('react');
var axios = require('axios');
var     _ = require('lodash');

var {Calendar, CalendarEvent, Collisions} = require('./calendar');

var App = React.createClass({

  getInitialState: function() {
    return {
      events: []
    };
  },

  getEvents: function () {
    axios.get('/events').then(function (resp) {
      this.setState({
        events: resp.data
      });
    }.bind(this));
  },

  componentDidMount: function() {
    this.getEvents();
  },

  render: function() {
    var mappedEvents = [];
    _.each(this.state.events, function (event, i) {
      _.each(event.dates, function (datepair, j) {
        mappedEvents.push(
          <CalendarEvent start={datepair.start} end={datepair.end} key={i * 5 + j}>
            {event.title}
          </CalendarEvent>
        );
      });
    });

    return (
      <div className="row">
        <div className="small-12 column">
          <h1>Calendar Widget</h1>
          <h3>Week View</h3>

          <Calendar type="week" collisionDetected={Collisions.SIDE_BY_SIDE}>
            {mappedEvents}
          </Calendar>

        </div>
      </div>
    );
  }

});

React.renderComponent(<App/>, document.body);
