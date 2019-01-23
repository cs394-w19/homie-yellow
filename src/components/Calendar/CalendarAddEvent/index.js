import React from 'react';
import ApiCalendar from 'react-google-calendar-api'; //https://www.npmjs.com/package/react-google-calendar-api
import {FormControl} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import {Button} from 'react-bootstrap'; 


// NOTE: THIS WILL NOT WORK LOCALLY!!! ALSO, probably need the API key from Nat for this to work
// should make this way more general and probably include some stuff from this on the task tab

export default class CalendarAddEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { // change this to be a single level and then reassemble things
            "summary": "initial name of event",
            "end": new Date(), 
            "start":  new Date(),
        "calendar" : "r3ngr47kskudbj0mfinjafhh2g@group.calendar.google.com"
      };

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
      this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
      this.handleNewEventButton = this.handleNewEventButton.bind(this);
    }
  
    handleNameChange(e) {
      this.setState({
          "event":
          { 
              "summary": e.target.value,
              "end" : this.state.end,
              "start" : this.state.start
          }}
        );
    }
  
    handleAddEventToCalendar(calEvent) {
        console.log("tried to add event to calendar");
        ApiCalendar.createEvent(calEvent, this.state.calendar).then((result) => {
            console.log(result);
              });
        console.log("did it work??");
    }

    handleNewEventButton(){

        let event = {
            "summary" : this.state.summary,
            "start" : {"dateTime" : this.state.start},
            "end" : {"dateTime" : this.state.end}
        };

        console.log(event);
        this.handleAddEventToCalendar(event);
    }

  
    handleKeyPress(e) {
        this.setState({"summary": e.target.value});
      if (e.key === 'Enter') {
        console.log(this.state);
      }
    }
  
    handleStartTimeChange(e){
        console.log(e);
        this.setState({
                "start" :  e
            }
          );
    }

    handleEndTimeChange(e) {
        console.log(e);

        this.setState({
                "end" : e}
          );
    }

    render() {
      return(
        <div className="EventCreationForm">
          <FormControl autoFocus
            type="text"
            placeholder="Enter event name"
            onChange={(e)=>this.handleNameChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
          
          <p>{this.state.summary}</p>
          <div className="startTimePicker">
            <DateTimePicker
                name="start time"
                onChange={(e)=>this.handleStartTimeChange(e)}
                value={this.state.start}
                required = {true}
            />
          </div>
          <div className="endTimePicker">
            <DateTimePicker
                name="end time"
                onChange={(e)=>this.handleEndTimeChange(e)}
                value={this.state.end}
                required = {true}
            />
          </div>
          <Button 
            bsStyle="success"
            onClick = {() => this.handleNewEventButton()}
          >
            Add New Event
          </Button>
        </div>
      );
    }
  }