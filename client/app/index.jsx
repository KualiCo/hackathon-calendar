/**
 * @jsx React.DOM
 */

var React = window.React = require('react');
var axios = require('axios');

var {Calendar, CalendarEvent} = require('./calendar');

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
    _.each(this.state.events, function (event) {
      _.each(event.dates, function (datepair) {
        mappedEvents.push(
          <CalendarEvent start={datepair.start} end={datepair.end}>
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

          <Calendar type="week">
            {mappedEvents}
          </Calendar>

        </div>
      </div>
    );
  }

});

React.renderComponent(<App/>, document.body);


// <h3>List View</h3>
// <Calendar title="Spring `14 Courses" events={this.state.events} type="list"/>
