import React from 'react';
import ApiCalendar from 'react-google-calendar-api';

export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
      this.handleAddEventToCalendar = this.handleAddEventToCalendar.bind(this);
      this.signUpdate = this.signUpdate.bind(this);
      this.handleShowCalendarEvents = this.handleAddEventToCalendar.bind(this);
      
      
      this.state = {"calendar" : "r3ngr47kskudbj0mfinjafhh2g@group.calendar.google.com"}; // a calendar ID
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

    handleAddEventToCalendar(object) {
        ApiCalendar.createEvent(object, this.state.calendar);
    }

       /**
     * Set the default attribute calendar
     * @param {string} newCalendar ID.
     */
    setCalendar(newCalendar){

    }

    handleShowCalendarEvents(number){
        if (ApiCalendar.sign){
            ApiCalendar.listUpcomingEvents(number).then(({result}) => {
                console.log(result.items);
              });
          } else {
              console.log("Hey somehow ApiCalendar.sign is false");
          }
    }


    render(){
      return (
          <div>
            <iframe 
            src="https://calendar.google.com/calendar/embed?src=r3ngr47kskudbj0mfinjafhh2g%40group.calendar.google.com&ctz=America%2FChicago"
            title="the shared calendar"
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"></iframe>

            <div>
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
              <button
                  onClick={(e) => this.handleAddEventToCalendar({"name": "my birthday"})}
              >
                add event to calendar
              </button>
              <button
                  onClick={(e) => this.handleShowCalendarEvents(10)}
              >
                print events
              </button>
            </div>
          </div>
            
        );
    }
}