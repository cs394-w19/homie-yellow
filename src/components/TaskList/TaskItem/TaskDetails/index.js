import React, { Component } from 'react';


export default class TaskDetails extends Component {
  render() {
    let t = this.props.task;

    return(
      <div>
        <p><i>{t.taskType} | assigned to {t.assignedTo}</i></p>
        <p><b>Due date: {t.taskDate.toDateString()}, Repeat {t.repeatInterval}.</b></p>
        <p>{t.taskDescription}</p>
        <p>Created by {t.taskCreator}; last modified on {t.taskModified.toDateString()}.</p>
      </div>
    );
  }
}
