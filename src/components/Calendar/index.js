import React from 'react';
import ApiCalendar from 'react-google-calendar-api'; //https://www.npmjs.com/package/react-google-calendar-api
import CalendarAddEvent from './CalendarAddEvent';

import './index.scss';



// NOTE: THIS WILL NOT WORK LOCALLY!!! ALSO, probably need the API key from Nat for this to work
// should make this way more general and probably include some stuff from this on the task tab

export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
      this.handleAddEventToCalendar = this.handleAddEventToCalendar.bind(this);
      this.signUpdate = this.signUpdate.bind(this);
      this.handleShowCalendarEvents = this.handleShowCalendarEvents.bind(this);
      
      this.state = {
        "calendar" : "r3ngr47kskudbj0mfinjafhh2g@group.calendar.google.com",
        "timesClicked": 0}; // a calendar ID
      ApiCalendar.setCalendar("r3ngr47kskudbj0mfinjafhh2g@group.calendar.google.com");
    }

    signUpdate(sign){
        this.setState({"sign": sign});
    }
    
    handleItemClick(event, name) {
      if (name === 'sign-in') {
        ApiCalendar.handleAuthClick();
      } else if (name === 'sign-out') {
        ApiCalendar.handleSignoutClick();
      }
    }

    handleAddEventToCalendar(calEvent) {
        console.log("tried to add event to calendar");
        ApiCalendar.createEvent(calEvent, this.state.calendar).then((result) => {
            console.log(result);
              });
        console.log("did it work??");

    }


    handleShowCalendarEvents(number){
        console.log("tried to show calendar events");
        let events = [];
        if (ApiCalendar.sign){
            
            ApiCalendar.listUpcomingEvents(number).then((result =>{
                console.log(result);
                events = result["result"]["items"];
                console.log(events);

                this.setState({"timesClicked" : this.state.timesClicked + 1});
                return events;
            }));
             
          } else {
              console.log("Hey somehow ApiCalendar.sign is false");
          }

        console.log(events);
        console.log("did this shit work?");

        return events;
    }


    render(){
      
      
      return (
          <div>
            <div className="iframe-container">
            <iframe 
            src="https://calendar.google.com/calendar/embed?src=r3ngr47kskudbj0mfinjafhh2g%40group.calendar.google.com&ctz=America%2FChicago"
            title="the shared calendar"
            
            frameBorder="0"
            scrolling="no">
            </iframe>
            </div>
            <div>
            <CalendarAddEvent/>
            
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-in')}
              >
                sign-in
              </button>
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-out')}
              >
                sign-out
              </button>
              {/*
               <button
                  onClick={(e) => this.handleAddEventToCalendar(
                      {"summary": "my birthday",
                        "end": {"dateTime": "2019-01-25T21:15:00-06:00"}, 
                        "start": {"dateTime": "2019-01-25T20:15:00-06:00"}})}
              >
                add event to calendar
              </button>
              <button
                  onClick={(e) => this.handleShowCalendarEvents(10)}
              >
                print events
              </button> */}
            </div>
            
          </div>
            
        );
    }
}