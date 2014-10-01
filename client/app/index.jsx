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
      events: [],
      selectedID: 0
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

  onClick: function (id) {
    if (this.state.selectedID === id) id = 0;
    this.setState({ selectedID: id });
  },

  render: function() {
    var mappedEvents = [];
    _.each(this.state.events, function (event, i) {
      _.each(event.dates, function (datepair, j) {
        var classes = this.state.selectedID - 1 === i ? 'chosen' : '';
        mappedEvents.push(
          <CalendarEvent start={datepair.start} end={datepair.end} onClick={this.onClick} key={i * 5 + j} id={i + 1}>
            <div className={classes}>
              {event.title}
            </div>
          </CalendarEvent>
        );
      }.bind(this));
    }.bind(this));

    return (
      <div className="row">
        <div className="small-12 column">
          <h1>Calendar Widget</h1>
          <h3>Week View</h3>

          <Calendar collisionDetected={Collisions.SIDE_BY_SIDE}>
            {mappedEvents}
          </Calendar>

        </div>
      </div>
    );
  }

});

React.renderComponent(<App/>, document.body);
