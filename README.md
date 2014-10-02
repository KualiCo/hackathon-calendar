A simple calendar widget

##Todo

 [ ] Calendar shouldn't depend on CalendarEvent's key to exist or be a number.
 [ ] Allow for custom widths and heights
 [x] Rework styles for padding and such
 [ ] Idea: custom renderer functions?
 [-] Clean separation of widget styles and app styles
 [ ] How do you package an app?
 [ ] Ability to limit how many days and times to show in the calendar

##Prereqs

 - Install Node 0.11.13 (I recommend you use nvm)
 - Install RethinkDB

##Install it

 - `npm install -g webpack`
 - `npm install`
 - `cd client && bower install`

##Hack on it

In four different terminal sessions run:

 - `rethinkdb`
 - `npm start`
 - `webpack -w`
 - `npm run lr`
