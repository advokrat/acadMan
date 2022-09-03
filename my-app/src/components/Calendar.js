
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'


export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2022-03-01' },
          { title: 'event 2', date: '2022-03-04' },
          { title: 'event 3', date: '2022-03-29' },
        ]}
        customButtons={{
           myTimeDayBtn: {
             text: "timeDay",
             click(){
               alert("Clicked")
             }
           }
        }}
        headerToolbar={{
          left: "prev,next",
          centre: "title",
          right: "today,dayGridDay,dayGridWeek,dayGridMonth,timeGridDay,timeGridWeek,myTimeDayBtn"
        }}
      />
    )
  }
}