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
        "events":[
          {
            id: 0,
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2019, 1, 1),
            end: new Date(2019, 1, 3),
          },
          {
            id: 1,
            title: 'Long Event',
            start: new Date(2019, 1, 7),
            end: new Date(2019, 1, 10),
          }]};


      }

    componentDidMount(){
      //BigCalendar.Views('week');
      console.log("the calendar has mounted")
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
      const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
      console.log(allViews);


      return ( 
      <div className="cal-container">
        <BigCalendar
          selectable
          localizer={localizer}
          events = {this.state.events}
          views={allViews}
          showMultiDayTimes
          defaultDate={new Date()}
          defaultView={"week"}
          onSelectSlot={() => {this.handleSelect()}}
        />
      </div>
    );
    }
}