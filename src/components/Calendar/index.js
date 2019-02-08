import React from 'react';
// import ApiCalendar from 'react-google-calendar-api'; //https://www.npmjs.com/package/react-google-calendar-api
import BigCalendar from 'react-big-calendar';

import dates from 'date-arithmetic'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './index.scss';

import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class MyWeek extends React.Component {
  render() {
    let { date } = this.props
    let range = MyWeek.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} />
  }
}

MyWeek.range = date => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (dates.lte(current, end, 'day')) {
    range.push(current)
    current = dates.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = date => {
  return `${moment(date).format("MMM D")} - ${moment(dates.add(date, 3, 'day')).format("D")}`; 
}
 
// messing around with the toolbar
// const CustomToolbar = (toolbar) => {
//   let date = toolbar.date;

//   let currentView = "week" ; // figure out how to get this view
//   let jumps = currentView == "week" ? 3 : 7; 

//   // const goToBack = () => {
//   //   let newFirstDay = dates.add(date, -1*jumps, 'day')

//   //   toolbar.date.setMonth(moment(newFirstDay).month);
//   //   toolbar.onNavigate('prev');
//   // };

//   // const goToNext = () => {
//   //   toolbar.date.setMonth(dates.add(date, jumps, 'day'));
//   //   toolbar.onNavigate('next');
//   // };

//   // const goToCurrent = () => {
//   //   const now = new Date();
//   //   toolbar.date.setMonth(now.getMonth());
//   //   toolbar.date.setYear(now.getFullYear());
//   //   toolbar.onNavigate('current');
//   // };

//   const label = () => {
//     const date = moment(toolbar.date);

//     let end = dates.add(date, jumps, 'day');

//     return (
//       <span><b>{date.format('MM/DD/YY')}</b>-<b>{moment(end).format('MM/DD/YY')}</b></span>
//     );
//   };

//   return (
//     <div>
//       <label>{label()}</label>

//       <div >
//         <button  onClick={BigCalendar.}>&#8249;</button>
//         <button  onClick={goToCurrent}>today</button>
//         <button  onClick={goToNext}>&#8250;</button>
//       </div>
//     </div >
//   );
// };


export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        tasks : {}
        ,
        events : [],
        currUser : this.props.personsInGroup.find(person => {
          return person.uid === this.props.user.uid
        })
      };



      //console.log("current user", currUser);
      // this.setState({currUser}, () => {console.log("done setting current user")});
      //console.log(this.props.user);

      this.tasksToEvents = this.tasksToEvents.bind(this);
      this.handleSelectEvent = this.handleSelectEvent.bind(this);
      this.eventStyleGetter = this.eventStyleGetter.bind(this);
      }

    componentDidMount(){
      console.log("the calendar has mounted")
      // add the user to the state
      

      // get the current task list and turn them into calendar events
      let taskListRef = this.props.database.ref('taskList');
      taskListRef.on('value', snapshot => {
        this.setState({
          tasks: snapshot.val(), 
       }, () => {this.tasksToEvents()});
      });

    }

    tasksToEvents(){

      //console.log(this.state.tasks);

      let calEvents = Object.keys(this.state.tasks).map((key)=> {
        //console.log("logging key", key);

        let end = parseInt(this.state.tasks[key].taskDate) + 3600*1000;
        // console.log("logging the end of this task", end);

        // console.log("what is endTime", this.state.tasks[key].endTime);

        if(this.state.tasks[key].endTime !== undefined){
          end = this.state.tasks[key].endTime ;
        }
        //console.log("log", end); 
        
        //console.log("group ID of task", this.state.tasks[key].groupID) 
        //console.log("group ID of user", this.state.currUser.groupID) 
        if(this.state.tasks[key].groupID !== this.state.currUser.groupID){
          return {};
        }


        return {
          "start" : new Date(parseInt(this.state.tasks[key].taskDate)),
          "end" : new Date(parseInt(end)),
          "title" : this.state.tasks[key].taskName,
          "assignedTo" : this.state.tasks[key].assignedTo != null ? this.state.tasks[key].assignedTo : "nobody" 
        };
      });

      // console.log(calEvents);

      this.setState({events : calEvents}, console.log("events" , this.state.events));
    }


    handleSelect(slots) {
        const title = window.prompt('New Event name')
        if (title){
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
              , newEvent
            ],
          });

          this.handleEventAdd(newEvent);

        }
          

          // also need to add the one changed thing to the DB

    }

    handleSelectEvent(event, e){
      //console.log("selected event", event, e);

    }
      
    eventStyleGetter(event) {
      // console.log("style getter");

      // console.log("event", event);
      //console.log("start", start);
      //console.log("end", end);
      //console.log("isSelected", isSelected);
      //console.log("event assigned to ", event.assignedTo);
      
      // make the string Matt be user name.
      let backgroundColor = (this.state.currUser && event.assignedTo.includes(this.state.currUser.uid)) ? "#D66853" : "#96a6cc";
      let newStyle = {
          style : {backgroundColor}
      };
      return newStyle;
  }
  

  
    handleEventAdd(event) {
      console.log(event);

      let eventKey = this.props.database.ref().child('taskList').push().key;
      let submittedTask = {
        groupID: this.state.currUser.groupID, // need group ID
        assignedTo: ["nobody"],
        isDeleted: 0,
        isComplete: true,
        paymentTotal: 0,
        repeatInterval: "None",
        riMonthly: " ",
        riWeekly: " ",
        taskCreator: this.state.currUser.uid, // should be the user somehow
        taskDate: event.start.getTime(),
        endTime : event.end.getTime(), // add the end time for an event
        taskDescription: event.title,
        taskID: eventKey,
        taskModified:  Date.now(),
        taskName: event.title,
        taskType: "Chore",
      };
    let updates = {};
    updates['/taskList/' + eventKey] = submittedTask;
    this.props.database.ref().update(updates);

  }

    render() {
      let components = { }

      let formats = {
        dateFormat: 'dd D',
      
        dayFormat: (date, x, localizer) =>
    localizer.format(date, 'dd D'),
      

      timeGutterFormat: (date, x, localizer) =>
      localizer.format(date, "h A")
      }

      return ( 
      <div className="cal-container">
        <BigCalendar
          selectable
          localizer={localizer}
          formats={formats}          
          eventPropGetter={(e) => this.eventStyleGetter(e)}
          //toolbar={false}
          // components={{
          //   toolbar: CustomToolbar
          // }}
          events = {this.state.events}
          views={{week : true , MyWeek : MyWeek}}// make a custom view for three days to use for mobile
          showMultiDayTimes
          defaultDate={new Date()}
          defaultView={"week"}
          onSelectSlot={(slots) => {this.handleSelect(slots)}}
          popup = {true}
          popupOffset={30}
          longPressThreshold={100}
          onSelectEvent= {(event, e) => this.handleSelectEvent(event, e)}

        />
      </div>
    );
    }
}