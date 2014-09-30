/**
 * @jsx React.DOM
 */

var React = require('react');
var axios = require('axios');

var Calendar = require('./calendar');

var HelloWorld = React.createClass({

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
    }.bind(this)).catch(function (err) {
      console.error(err);
    });
  },

  componentDidMount: function() {
    this.getEvents();
  },

  render: function() {
    return (
      <div className="row">
        <div className="small-12 column">
          <h1>Calendar Widget</h1>
          <h3>Week / Time View</h3>
          <Calendar events={this.state.events}/>
          <h3>List View</h3>
          <Calendar events={this.state.events} type="list"/>
        </div>
      </div>
    );
  }

});

React.renderComponent(<HelloWorld/>, document.body);
