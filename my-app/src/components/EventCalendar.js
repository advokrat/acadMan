import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { SelectionState } from 'draft-js';
import EventCalendarChild from './EventCalenderChild';
import AddEventForm from './AddEventForm';
import ShowEventDetails from './ShowEventDetails';

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, event: {}, pastEvents: [], addedEvents: [] };
  }

  fnGetEvents = async () => {

    try {
      let res = await axios.get('http://localhost:3000/calendar/getEvents')

      let arr = res.data.events

      let events = []

      for (let i = 0; i < arr.length; i++) {

        let temp = {};  

        /*

        if(arr[i].startDate === arr[i].endDate) {
          temp = {
            allDay: false,
            title: arr[i].title,
            start: arr[i].startDate.concat("T", arr[i].startTime),
            end: arr[i].endDate.concat("T", arr[i].endTime),
            repeatWeekly: arr[i].repeatWeekly,
            content: arr[i].content
        }     
      }

      else {
          temp = {
            "allDay": true,
            "title": arr[i].title,
            "start": arr[i].startDate,
            "end": arr[i].endDate,
            "repeatWeekly": arr[i].repeatWeekly,
            "content": arr[i].content
          }
      }

      if(arr[i].repeatWeekly === "Yes") {
        let daysOfWeek = [];
        const date = new Date(arr[i].startDate.split("-"));
        daysOfWeek.push(date.getDay());
        temp['daysOfWeek'] = daysOfWeek;
      }

      */
    

      
      if(arr[i].allDay === "Yes") {

        if(arr[i].repeatWeekly === "Yes") {
          let daysOfWeek = [];
          const date = new Date(arr[i].startDate.split("-"));
          daysOfWeek.push(date.getDay());
          temp = {
            id: arr[i].id,
            daysOfWeek: daysOfWeek,
            title: arr[i].title, 
            start: arr[i].startDate,
            end: arr[i].endDate,
            startRecur: arr[i].startDate,
            repeatWeekly: arr[i].repeatWeekly,
            content: arr[i].content
          }
        }

        else {
          temp = {
            id: arr[i].id,
            allDay: true,
            title: arr[i].title,
            start: arr[i].startDate,
            end: arr[i].endDate,
            repeatWeekly: arr[i].repeatWeekly,
            content: arr[i].content
          }
        }

      }

      else {

        if(arr[i].repeatWeekly === "Yes") {
          let daysOfWeek = [];
          const date = new Date(arr[i].startDate.split("-"));
          daysOfWeek.push(date.getDay());
          temp = {
            id: arr[i].id,
            daysOfWeek: daysOfWeek,
            allDay: false,
            title: arr[i].title,
            startTime: arr[i].startTime,
            endTime: arr[i].endTime,
            startRecur: arr[i].startDate,
            repeatWeekly: arr[i].repeatWeekly,
            content: arr[i].content
          }
        }

        else {
          temp = {
            id: arr[i].id,
            allDay: false,
            title: arr[i].title,
            start: arr[i].startDate.concat("T", arr[i].startTime),
            end: arr[i].endDate.concat("T", arr[i].endTime),
            repeatWeekly: arr[i].repeatWeekly,
            content: arr[i].content
          }  
        }

      }

      events.push(temp)

      }

      this.setState({ pastEvents: events });

    } catch (error) {
      console.log(error)
    }

  }

  componentDidMount() {
    this.fnGetEvents();
  }


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleEventClick = ({ event, el }) => {
    this.toggle();
    this.setState({ event: event });

    console.log(this.state.event.content);
  };

  handleDeleteEvent = () => {
    this.state.pastEvents = this.state.pastEvents.filter(event => event.id !== this.state.event.id)

    console.log(`http://localhost:3000/calendar/deleteEvent/${this.state.event.id}`);

    console.log(this.state.event.content);

    axios.delete(`http://localhost:3000/calendar/deleteEvent/${this.state.event.id}`);
    this.state.event = {}; this.toggle();
  };

  render() {
    const calendarRef = React.createRef()
    return (
      // <EventCalendarChild pastEvents={this.state.pastEvents} />
      <div>
        <br />
        <div>
          <AddEventForm >  </AddEventForm>
        </div>
        <FullCalendar
          height="auto"
          nowIndicator={true}
          ref={calendarRef}
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={this.state.pastEvents}
          eventClick={this.handleEventClick}
          editable={true}
          headerToolbar={{
            left: "prev,next",
            centre: "Title",
            right: "dayGridMonth,timeGridDay,timeGridWeek"
          }}
        />

        <Modal
          show={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader style={{color: 'black'}}>
            <b>Title:</b> {this.state.event.title}
          </ModalHeader>
          <ModalBody style={{color: 'black'}}>
            <div>
              <b>Description:</b> {this.state.event.content}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant='danger' onClick={this.handleDeleteEvent} >Delete Event</Button>{" "}
            <Button variant='secondary' onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}
