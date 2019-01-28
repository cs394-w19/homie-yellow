import React from 'react';
// import ApiCalendar from 'react-google-calendar-api'; //https://www.npmjs.com/package/react-google-calendar-api
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarAddEvent from './CalendarAddEvent';



import './index.scss';

import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        tasks : {}
        ,
        events : []
      };

      this.tasksToEvents = this.tasksToEvents.bind(this);
      }

    componentDidMount(){
      console.log("the calendar has mounted")
      let taskListRef = this.props.database.ref('taskList');
      taskListRef.on('value', snapshot => {
        this.setState({
          tasks: snapshot.val(), 
       }, () => {this.tasksToEvents()});
      });

    }

    tasksToEvents(){
      let calEvents = Object.keys(this.state.tasks).map((key)=> {
        console.log(key);
        return {
          "start" : new Date(parseInt(this.state.tasks[key].taskDate)),
          "end" : new Date(parseInt(this.state.tasks[key].taskDate) + 3600),
          "title" : this.state.tasks[key].taskName
        };
      });

      console.log(calEvents);

      this.setState({events : calEvents}, console.log("events" , this.state.events));

    }


    handleSelect(start, end ) {
        const title = window.prompt('New Event name')
        if (title)
          this.setState({
            events: [
              ...this.state.events,
              {
                start,
                end,
                title,
              },
            ],
          });

    }
      
  

    render() {

      return ( 
      <div className="cal-container">
        <BigCalendar
          selectable
          localizer={localizer}
          events = {this.state.events}
          views={['week']}
          showMultiDayTimes
          defaultDate={new Date()}
          defaultView={"week"}
          onSelectSlot={() => {this.handleSelect()}}
        />
      </div>
    );
    }
}