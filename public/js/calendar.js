function Calendar (id) {
  var self = this;

  this.const = {
    ONE_DAY: 1000 * 60 * 60 * 24,
    ONE_WEEK: 1000 * 60 * 60 * 24 * 7
  };
  this.internal = {
    container: _("#" + id),
    events: {},
    meta: {
      offset: 0
    }
  };
}

Calendar.prototype = {
  setOffset: function (offset) {
    var date = this.internal.date;
    var old_offset = this.internal.meta.offset;
    var new_offset = this.internal.meta.offset = parseInt(offset, 10);

    // increment by offset..
    date.setMonth(date.getMonth() + (new_offset - old_offset));
    this.setDate(date);

    this.drawCalendar();
  },

  setDate: function (date) {
    this.internal.date = (date) ? new Date(date) : new Date();
    this.setMonth();
  },

  setMonth: function () {
    this.internal.currentMonth = this.getDate().getMonth();
  },

  setEvents: function (day, events) {
    this.internal.events[day] = events;
  },

  getDate: function () {
    return this.internal.date;
  },

  getDatestamp: function () {
    return this.internal.date * 1;
  },

  getMonth: function () {
    return this.internal.currentMonth;
  },

  getEvents: function (day) {
    return this.internal.events[day] || [];
  },

  getWeekPosition: function () {
    // 0 = Sunday, 6 = Saturday
    var dayOfWeek = this.getDate().getDay();

    return dayOfWeek;
  },

  getDateByCoord: function (x, y) {
    // row is 7 days plus x offset
    var offset = (y * 7 + x) * this.const.ONE_DAY;

    // return the time of first sunday plus offset time
    return new Date(this.firstSunday() * 1 + offset);
  },

  isCurrentMonth: function (date) {
    return (date.getMonth() === this.getMonth());
  },

  firstSunday: function () {
    var offsetToNextSaturday = this.const.ONE_DAY * (6 - this.getWeekPosition());
    var nextSaturday = new Date(this.getDatestamp() + offsetToNextSaturday);

    var pointerSaturday = nextSaturday;

    while (pointerSaturday.getDate() > 7) {
      pointerSaturday = new Date(pointerSaturday * 1 - this.const.ONE_WEEK);
    }

    var firstSunday = new Date(pointerSaturday * 1 - this.const.ONE_DAY * 6);

    return firstSunday;
  },

  drawRow: function (y) {
    var row = _.create({ tagName: "tr" });
    var td = new Array(7);

    var $this = this;

    var date, moment, numEvents, eventsDate, eventsIcon, today, className;
    _.loop(td, function (i, o) {
      className = [];

      date = $this.getDateByCoord(o, y);

      today = date.getDate() === $this.getDate().getDate() && date.getMonth() === $this.getMonth();

      if (today) {
        className.push("current-date");
      }

      if (!$this.isCurrentMonth(date)) {
        className.push("grey");
      }


      moment = _.moment(date);

      eventsDate = (moment.fmt.m) + "-" + moment.fmt.d + "-" + moment.fmt.y;
      numEvents = $this.getEvents(eventsDate).length;
      eventsIcon = "&#9679;".repeat(numEvents) || "&nbsp;";

      i = _.create({
        tagName: "td",
        "data-date": moment.fmt.m + "-" + moment.fmt.d + "-" + moment.y,
        "data-num-events": numEvents,
        "data-name": moment.month + " " + moment.d + ", " + moment.y,
        innerHTML: function () {
          var html = "<p class='date'>" + moment.d + "</p>" +
                     "<p class='month'>" + moment.month + "</p>" +
                     "<p class='num-events'>" + eventsIcon + "</p>";
          return html;
        },
        className: className.join(" ")
      });

      _(row).append(i);
    });

    return row;
  },

  eventsBox: function () {
    var container = _.create({ id: "events_container" });
    var exit = _.create({
      innerHTML: "x",
      id: "events_exit"
    });
    var header = _.create({
      tagName: "h1",
      innerHTML: "Events"
    });
    var eventsBox = _.create({ id: "events_box" });

    _(container).append([exit, header, eventsBox]);

    return container;
  },

  drawTableHeader: function () {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var thead = _.create({ tagName: "thead" });
    var tr = _.create({ tagName: "tr" });

    _(thead).append(tr);

    var th = new Array(7);

    _.loop(th, function (i, o) {
      i = _.create({
        tagName: "th",
        innerHTML: days[o]
      });

      _(tr).append(i);
    });

    return thead;
  },

  drawCalendar: function () {
    var container = _.create({ className: "calendar-container" });
    var currentMonth = _.moment(this.internal.date).month;
    var currentYear = _.moment(this.internal.date).y;
    var nav = _.create({
      className: "calendar-nav",
      innerHTML: function () {
        var html = "<div class='month-button' id='prev_month'>⇦</div>";
        html    += "<div class='month-button' class='current-month'>" + currentMonth + " " + currentYear + "</div>";
        html    += "<div class='month-button' id='next_month'>⇨</div>";
        html    += "<div class='clear'></div>";
        return html;
      }
    });

    var table = _.create({
      tagName: "table",
      cellspacing: "0",
      className: "brock-calendar"
    });

    _(table).append(this.drawTableHeader());

    var rows = new Array(5);

    $this = this;

    _.loop(rows, function (i, o) {
      i = $this.drawRow(o);
      _(table).append(i);
    });

    _(container)
      .append(nav)
      .append(table)
      .append(this.eventsBox());

    this.internal.container
      .html("")
      .append(container);

    calendar.interact();
  },

  updateEvents: function (name, events) {
    var eventsBox = _("#events_box");
    var indEvent;

    _("#events_container h1").html("Events for " + name);

    eventsBox.html(" ");

    if (events.length > 0) {
      _.loop(events, function (i, o) {
        indEvent = _.create({
          className: "ind-event",
          innerHTML: i
        });

        eventsBox.append(indEvent);
      });
    } else {
      eventsBox.html("There are no events for this date.");
    }
  },

  interact: function () {
    var self = this;

    var events = {
      select: function (sel) {
        _(sel).addClass("calendar-selection");
      },

      deselect: function (sel) {
        _(sel).removeClass("calendar-selection");
      },

      showContainer: function () {
        _("#events_container").addClass("visible");
      },

      hideContainer: function () {
        _("#events_container").removeClass("visible");
      },

      startTransition: function () {
        _("#events_container").addClass("transition");
      },

      endTransition: function () {
        _("#events_container").removeClass("transition");
      },

      updateEvents: function ($this) {
        calendar.updateEvents(_($this).attr("data-name"), calendar.getEvents(_($this).attr("data-date")));
      },

      prevMonth: function () {
        self.setOffset(self.internal.meta.offset - 1);
      },

      nextMonth: function () {
        self.setOffset(self.internal.meta.offset + 1);
      }
    };

    _("#prev_month").click(events.prevMonth);

    _("#next_month").click(events.nextMonth);

    _("td").on("click", function () {
      var $this = this;

      _(".brock-calendar td").each(function () {
        events.deselect(this);
      });

      events.select(this);

      if (_("#events_container").hasClass("visible")) {
        events.startTransition();

        setTimeout(function () {
          events.updateEvents($this);
          events.endTransition();
        }, 200);
      } else {
        events.updateEvents(this);
        events.showContainer();
      }
    });

    _("#events_exit").on("click", function () {
      _("#events_container").removeClass("visible");
    });
  }
};
