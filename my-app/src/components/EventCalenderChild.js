import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { SelectionState } from 'draft-js';

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pastEvents:this.props.pastEvents, addedEvents:[]};
  } 

  render() {
    const calendarRef = React.createRef()
    return (
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={[
          {
            "title": "event1",
            "startTime": "05:00",
            "endTime": "08:00",
            "repeatDays": [
              0,
              2,
              3,
              5
            ],
          }
        ]}
        headerToolbar={{
          left: "prev,next",
          centre: "Title",
          right: "dayGridDay,dayGridWeek,dayGridMonth,timeGridDay,timeGridWeek"
        }}
      />
    )
  }
}