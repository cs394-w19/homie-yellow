import React, { Component } from "react";
import { Row, Col, Glyphicon, Button } from "react-bootstrap";

export default class TaskDetails extends Component {

  render() {

    let agereq;
    let genreq;
    let ethreq;
    let relreq;
    let req;


    // temporary list of people in the group
    let t = this.props.task;
    let showEditButton;
    let showDeleteButton;
    let showSignUpButton;

    if (t.toggleAge === 1) {
      agereq = (
        <p>Ages: {t.ageFrom} to {t.ageTo}</p>
        );
    }

    if (t.toggleGender === 1) {
      genreq = (
        <p>Gender: {t.gender}</p>
        );
    }

    if (t.toggleEthnicity === 1) {
      ethreq = (
        <p>Ethnicity: {t.ethnicity}</p>
        );
    }

    if (t.toggleRelationship === 1) {
      relreq = (
        <p>Relationship status: {t.relationship}</p>
        );
    }

    if (((t.toggleAge === 0) && (t.toggleGender === 0) && (t.toggleEthnicity === 0) && (t.toggleRelationship === 0)) || ((t.ageFrom === 0) && (t.ageTo === 0) && (t.gender === "") && (t.ethnicity === "") && (t.relationship === ""))) {
      req = (
        <p>None</p>
        );
    }

    if (!(((t.toggleAge === 0) && (t.toggleGender === 0) && (t.toggleEthnicity === 0) && (t.toggleRelationship === 0)) || ((t.ageFrom === 0) && (t.ageTo === 0) && (t.gender === "") && (t.ethnicity === "") && (t.relationship === "")))) {
      req = (
        <p>{agereq}{genreq}{ethreq}{relreq}</p>
        );
    }

    let assignedPeople = this.props.personsInGroup.filter(person => {
      if (!t.assignedTo) return false;
      return t.assignedTo.includes(person.uid);
    });
    let assignedTo = t.assignedTo == null
        ? "nobody"
        : assignedPeople.map(p => p.name).join(", ");

    let taskCreator = this.props.personsInGroup.find(person => {
      return person.uid === t.taskCreator;
    });

    if (taskCreator === undefined) {
      taskCreator = { name: "[deleted]" };
    }

    if ((!(this.props.user.uid === t.taskCreator))) {
      if (!((((this.props.task.ageFrom === 0) && (this.props.task.ageTo === 0)) || ((this.props.task.ageFrom <= this.props.page) && (this.props.task.ageTo >= this.props.page))) && ((this.props.task.gender === "") || (this.props.task.gender === this.props.pgender)) && ((this.props.task.ethnicity === "") || (this.props.task.ethnicity === this.props.pethnicity)) && ((this.props.task.relationship === "") || (this.props.task.relationship === this.props.prelationship)))) {
        showSignUpButton = (
            <Button
              bsSize="big"
              className="pull-right"
              disabled
            >
              <span>
                Sorry, you are not eligible for this study
              </span>
            </Button>
          );
      } else {

        if (t.assignedTo === this.props.user.uid) {
         showSignUpButton = (
            <Button
              bsSize="big"
              bsStyle="success"
              className="pull-right"
              disabled
            >
              <span>
                You Signed Up
              </span>
            </Button>
          );
        } else {
          
            if ((t.participants > 0) && (t.assignedTo !== this.props.user.uid)) {
              showSignUpButton = ( 
                <Button
              bsSize="big"
              bsStyle="success"
              className="pull-right"
              onClick={() => this.props.handleSignUpTask(t)}
              >
              <span>
                Sign Up
              </span>
              </Button>
             );
            } else {
              showSignUpButton = ( 
                <Button
              bsSize="big"
              bsStyle="success"
              className="pull-right"
              disabled
              >
              <span>
                Sign is Full
              </span>
              </Button>
              );
            }
        }

      }

    }

    if ((t.taskDate < Date.now()) && (this.props.user.uid !== t.taskCreator)) {
       showSignUpButton = (
          <Button
            bsSize="big"
            className="pull-right"
            disabled
          >
            <span>
              Study is Over
            </span>
          </Button>
        );
    }

    if (this.props.user.uid === t.taskCreator) {
        showEditButton = (
          <Button
            className="pull-right"
            bsSize="small"
            onClick={() => this.props.handleEditTask()}
          >
            <span>
              <Glyphicon glyph="pencil" />
            </span>
          </Button>
        );
        showDeleteButton = (
          <Button
            bsSize="small"
            className="pull-right"
            onClick={() => this.props.handleDeleteTask(t)}
          >
            <span>
              <Glyphicon glyph="trash" />
            </span>
          </Button>
        );
    }

    let comp;




    return (
      <div>
        <Row>
          <Col xs={12}>
         <p> {t.taskDescription}</p>
          </Col>
        </Row>
        <Row>
          <Col style={{float:'left', marginTop: 10, marginLeft: 15, marginRight: 20}}>
            <small>
            <p><b>Details:</b></p>
              <p>Available Until: {new Date(1 * t.taskDate).toDateString()}</p>
              <p><Glyphicon glyph="usd"/> {t.compensation}.00</p>
            <p><Glyphicon glyph="map-marker"/>At: {t.location}</p>
            <p><Glyphicon glyph="time"/> Duration: {t.duration} minutes</p>
            <p><Glyphicon glyph="user"/> Up to: {t.participants} spaces left</p>
            </small>
          </Col>
          <Col style={{float: 'left', marginTop: 10,}}>
          <small><p><b>Requirements:</b></p>{req}</small>
            
            </Col>
        </Row>
        <Row>
          <Col style={{float:'left', marginLeft: 12, marginTop: 10,}}>

            <small><p><b>Contact Information:</b></p>
            <p>{t.contact}</p></small>
          </Col>
        </Row>
        <Row>
          <Col className="pull-right" xs={5} sm={3} md={2} lg={1}>

            {showEditButton}
            {showDeleteButton}
            {showSignUpButton}
          </Col>
        </Row>
      </div>
    );
  }
}
