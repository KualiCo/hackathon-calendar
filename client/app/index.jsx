/**
 * @jsx React.DOM
 */

var React = window.React = require('react/addons');
var axios = require('axios');
var     _ = require('lodash');
require('./style');

var CourseDetails = require('./course-details');
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
    var sID = this.state.selectedID - 1;
    var mappedEvents = [];
    var key = 0;
    _.each(this.state.events, function (event, i) {
      _.each(event.dates, function (datepair, j) {
        var classes = React.addons.classSet({
          selected: sID === i
        });
        mappedEvents.push(
          <CalendarEvent start={datepair.start} end={datepair.end} onClick={this.onClick} id={i + 1}>
            <div className={classes}>
              {event.title}
            </div>
          </CalendarEvent>
        );
      }.bind(this));
    }.bind(this));

    var selected = sID > -1 ? this.state.events[sID] : null;

    return (
      <div className="row">
        <div className="small-12 column">
          <h1>Calendar Widget</h1>

          <h3>Week View</h3>
          <Calendar collisionDetected={Collisions.SIDE_BY_SIDE}>
            {mappedEvents}
          </Calendar>

          <h3>Details</h3>
          <CourseDetails course={selected}/>

        </div>
      </div>
    );
  }

});

React.renderComponent(<App/>, document.body);
