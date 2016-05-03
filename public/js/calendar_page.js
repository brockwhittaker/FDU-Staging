/* initialize the calendar. */
var calendar = new Calendar("calendar-container");

/* set some events for the calendar. */
calendar.setEvents("05-07-2016", [
  "Fall Registration Opens",
  "First Day of Spring Break",
  "Meet the Professors (OrgSync)",
  "Club Fund Release Date"
]);

calendar.setEvents("05-09-2016", [
  "Some Random Event",
  "Having fun at the Brickyard"
]);

calendar.setEvents("05-15-2016", [
  "Blah blah some event to write",
  "Some meet and greet with staff"
]);

calendar.setEvents("05-17-2016", [
  "Blah blah some event to write"
]);

calendar.setEvents("05-24-2016", [
  "Blah blah some event to write"
]);
/* end of the calendar events. */

/* set the date of the calendar currently. */
calendar.setDate();
calendar.drawCalendar();

//calendar.setOffset(0);
