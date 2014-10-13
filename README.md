A simple calendar widget

##Todo

 - [x] Calendar shouldn't depend on CalendarEvent's key to exist or be a number.
 - [x] Allow for custom widths and heights
 - [x] Rework styles for padding and such
 - [ ] Idea: custom renderer functions?
 - [-] Clean separation of widget styles and app styles
 - [ ] How do you package an app?
 - [ ] Ability to limit how many days and times to show in the calendar

##Prereqs

 - Install Node 0.11.14 (I recommend you use nvm)

##Install it

 - `npm install -g webpack`
 - `npm install`
 - `cd client && bower install`

##Hack on it

In three different terminal sessions run:

 - `npm start`
 - `webpack -w`
 - `npm run lr`
