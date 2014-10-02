/**
 * @jsx React.DOM
 */

var  React = require('react/addons');
var moment = require('moment');
var      _ = require('lodash');

var CourseDetails = React.createClass({

  getDefaultProps: function() {
    return {
      course: null
    };
  },

  render: function() {
    var course = this.props.course;
    var data = null;
    if (course) {

      var start = moment(course.dates[0].start).format('h:mm');
      var end = moment(course.dates[0].end).format('h:mm a');
      var dates = _.map(course.dates, function (date) {
        return moment(date.start).format('ddd');
      }).join(', ');

      data = (
        <div>
          <div>
            <div className="lbl">Title:</div>
            <span>{course.title}</span>
          </div>
          <div>
            <div className="lbl">Schedule:</div>
            <span>{dates} from {start} - {end}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="course-details">
        {data}
      </div>
    );
  }

});

module.exports = CourseDetails;
