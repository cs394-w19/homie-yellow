import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Row, Col, Grid, Glyphicon, Button} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let task = this.props.task;
      let user = this.props.user;
      let style = task.isComplete ? "success" : "default";

      let assignedPeople = this.props.personsInGroup.filter(person => {
        if (!task.assignedTo) return false;
        return task.assignedTo.includes(person.uid);
      });
      let assignedTo = (task.assignedTo == null) ? "-" : assignedPeople.map(p => p.name).join(", ");

      let taskDate = new Date(1*task.taskDate).toDateString();
      taskDate = taskDate.substring(0, taskDate.length - 5);
      let showCompleteButton;
      
      let showExpired;

      if (this.props.task.taskType !== "Study") {
        showExpired = this.props.task.taskType;
      }

      let displayVal = this.props.displayVal;
      let t = this.props.task;

      let comp = (
          <h4 className="taskName">
                 <Glyphicon glyph="usd"/> {t.compensation}.00
              </h4>
        );

      let dur = (
        <h4 className="taskName">
          <Glyphicon glyph="time"/> {t.duration} minutes
          </h4>
        );

      let date = (
          <h4 className="taskName">
          <Glyphicon glyph="calendar"/> Until {new Date(1 * t.taskDate).getMonth() + 1}/{new Date(1 * t.taskDate).getDate()}/{new Date(1 * t.taskDate).getYear() + 1900}
          </h4>
        );

      let loc = (
          <h4 className="taskName">
          <Glyphicon glyph="map-marker"/> {t.location}
          </h4>
        );

      let par = (
          <h4 className="taskName">
          <Glyphicon glyph="user"/> {t.participants} spaces available
          </h4>
        );

      let show;

      if (displayVal === "comp") {
        show = (
          <div> {comp}</div>
          );
      }

      if (displayVal === "dur") {
        show = (
          <div> {dur}</div>
          );
      }

      if (displayVal === "date") {
        show = (
          <div> {date}</div>
          );
      }

      if (displayVal === "loc") {
        show = (
          <div> {loc}</div>
          );
      }

      if (displayVal === "par") {
        show = (
          <div> {par}</div>
          );
      }

      return(
        <Grid id="TaskHeader">
          <Col className="headLeft">
            <Row>
              <h4 className="taskName">
                {this.props.task.taskName}</h4>
                <small>
                <i>{showExpired}</i></small>
            </Row>
          </Col>
          <Col className="headRight">
                 {show}
          </Col>
        </Grid>
      );
    }
}
