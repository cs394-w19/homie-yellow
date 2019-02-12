import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MyWeek from "./ThreeDayView";
import CalendarToolbar from "./Toolbar"

import './index.scss';

import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : {},
      events : [],
      currUser : this.props.personsInGroup.find(person => {
        return person.uid === this.props.user.uid
      })
    };
    this.tasksToEvents = this.tasksToEvents.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  componentDidMount() {
    // get the current task list and turn them into calendar events
    let taskListRef = this.props.database.ref('taskList');
    taskListRef.orderByChild("groupID").equalTo(this.props.groupID).on('value', snapshot => {
      let group_tasks = [];
      snapshot.forEach((child) => {
          group_tasks.push(child.val());
      });
      let tasks = group_tasks.filter((t) => !t.isComplete && !t.isDeleted);
      this.setState(
        { tasks: tasks },
        () => {this.tasksToEvents()}
      );
    });
  }

  tasksToEvents() {
    let calEvents = [];
    if (this.state.tasks) {
      calEvents = Object.keys(this.state.tasks).map((key)=> {
        let end = parseInt(this.state.tasks[key].taskDate) + 3600*1000;

        if(this.state.tasks[key].endTime !== undefined) {
          end = this.state.tasks[key].endTime;
        }

        return {
          "start" : new Date(parseInt(this.state.tasks[key].taskDate)),
          "end" : new Date(parseInt(end)),
          "title" : this.state.tasks[key].taskName,
          "assignedTo" : this.state.tasks[key].assignedTo != null ? this.state.tasks[key].assignedTo : "nobody"
        };
      });
    };
    this.setState({ events : calEvents });
  }


  handleSelect(slots) {
    const title = window.prompt('New Event name')
    if (title) {
      let newEvent = {
        "start": slots.start,
        "end" : slots.end,
        title,
        "isSelected" : false,
        "assignedTo" : "nobody"
      };
      this.setState({
        events: [
          ...this.state.events,
          newEvent
        ],
      });
      this.handleEventAdd(newEvent);
    }
  }

  handleSelectEvent(event, e){
    //console.log("selected event", event, e);

  }

  eventStyleGetter(event) {
    let backgroundColor = (this.state.currUser && event.assignedTo.includes(this.state.currUser.uid)) ? "#D66853" : "#96a6cc";
    let newStyle = {
        style : {backgroundColor}
    };
    return newStyle;
  }


  handleEventAdd(event) {
    let eventKey = this.props.database.ref().child('taskList').push().key;
    let submittedTask = {
      groupID: this.state.currUser.groupID, // need group ID
      isDeleted: 0,
      isComplete: false,
      paymentTotal: 0,
      repeatInterval: "none",
      taskCreator: this.state.currUser.uid, // should be the user somehow
      taskDate: event.start.getTime(),
      endTime : event.end.getTime(), // add the end time for an event
      taskDescription: event.title,
      taskID: eventKey,
      taskModified: Date.now(),
      taskName: event.title,
      taskType: "Event",
    };
    let updates = {};
    updates['/taskList/' + eventKey] = submittedTask;
    this.props.database.ref().update(updates);
  }

  render() {
    let components = {
      toolbar: CalendarToolbar
    };

    let formats = {
      dateFormat: 'dd D',
      dayFormat: (date, x, localizer) =>
        localizer.format(date, 'dd D'),
      timeGutterFormat: (date, x, localizer) =>
        localizer.format(date, "h A"),
      dayRangeHeaderFormat: ({ start, end }, x, localizer) =>
        `${localizer.format(start, "MMM D")} - ${localizer.format(end, "D")}`
    };


    return (
      <div className="cal-container">
        <BigCalendar
          selectable
          localizer={localizer}
          formats={formats}
          eventPropGetter={(e) => this.eventStyleGetter(e)}
          components={components}
          events = {this.state.events}
          views={{day: true , week : true , MyWeek : MyWeek}}
          showMultiDayTimes
          defaultDate={new Date()}
          defaultView={"day"}
          onSelectSlot={(slots) => {this.handleSelect(slots)}}
          popup = {true}
          longPressThreshold={100}
          onSelectEvent= {(event, e) => this.handleSelectEvent(event, e)}
        />
      </div>
    );
  }
}
