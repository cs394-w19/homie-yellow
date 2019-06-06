import React, { Component } from "react";
import { Row, Col, FormControl, FormGroup, Button, Form, InputGroup } from "react-bootstrap";
import Datetime from "react-datetime";
import TaskAssignedToCheckboxes from "./TaskAssignedToCheckboxes";
import { Checkbox } from "react-bootstrap";
import "./index.scss";
import "react-datetime/css/react-datetime.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class TaskCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //page: 0,
      //pgender: "",
      //pethnicity: "",
      //prelationship: "",
      uid: this.props.user.uid,
      toggleAge: 0,
      toggleGender: 0,
      toggleEthnicity: 0,
      toggleRelationship: 0,
      age: 0,
      ageFrom: 0,
      ageTo: 0,
      gender: "",
      ethnicity: "",
      relationship: "",
      taskName: "",
      compensation: 0,
      participants: 0,
      duration: 0,
      location: "",
      isDeleted: 0,
      paymentTotal: 0,
      taskType: this.props.type,
      taskCreator: this.props.user.uid,
      groupID: this.props.groupID,
      taskModified: Date.now(),
      taskDescription: "",
      isComplete: false,
      assignedTo: [],
      repeatInterval: "none",
      riWeekly: [],
      riMonthly: [],
      riTaskTime: Date.now(),
      taskDate: new Date(Date.now() + 86400),
      contact: '',
      //dob: "",
      //myage: 0,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
   // this.handleAgeCalculation = this.handleAgeCalculation.bind(this);
   // this.handleDobChange = this.handleDobChange.bind(this);
    this.handleAgeFromChange = this.handleAgeFromChange.bind(this);
    this.handleAgeToChange = this.handleAgeToChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleEthnicityChange = this.handleEthnicityChange.bind(this);
    this.handleRelationshipChange = this.handleRelationshipChange.bind(this);
    this.handleGenderToggleChange = this.handleGenderToggleChange.bind(this);
    this.handleEthnicityToggleChange = this.handleEthnicityToggleChange.bind(this);
    this.handleRelationshipToggleChange = this.handleRelationshipToggleChange.bind(this);
    this.handleAgeToggleChange = this.handleAgeToggleChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
    this.handleCompensationChange = this.handleCompensationChange.bind(this);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    
    this.handleContactChange = this.handleContactChange.bind(this);
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState(this.props.task);
      this.setState({
        taskDate: new Date(this.props.task.taskDate)
      });
    }
    /*
    let participants = this.props.database.ref().child("participants");
    participants.on('value', data => {
      let age = 0;
      let ethnicity = '';
      let gender = '';
      let relationship = '';
      data.forEach(elem => {
        if (elem.val().uid === this.state.uid) {
          age = elem.val().age;
          ethnicity = elem.val().ethnicity;
          relationship = elem.val().relationship;
          gender = elem.val().gender;
        }
      });
      this.setState({
        page: age,
        pgender: gender,
        pethnicity: ethnicity,
        prelationship: relationship,
      })

    });*/
  }


  handleNameChange(e) {
    this.setState({ taskName: e.target.value });
  }

  handleContactChange(e) {
    this.setState({ contact: e.target.value });
  }

  handleDescChange(e) {
    this.setState({ taskDescription: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleDateChange(date) {
    this.setState({ taskDate: date });
  }

  handleCompensationChange(e) {
    this.setState({ compensation: e.target.value });
  }

  handleParticipantsChange(e) {
    this.setState({ participants: e.target.value });
  }
  handleDurationChange(e) {
    this.setState({ duration: e.target.value });
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleAgeFromChange(e) {
    this.setState({ ageFrom: e.target.value });
  }

  handleAgeToChange(e) {
    this.setState({ ageTo: e.target.value });
  }

  handleGenderChange(e) {
    this.setState({ gender: e.target.value });
  }

  handleEthnicityChange(e) {
    this.setState({ ethnicity: e.target.value });
  }

  handleRelationshipChange(e) {
    this.setState({ relationship: e.target.value });
  }

  handleAgeToggleChange(e) {
    if (this.state.toggleAge === 0) {
      this.setState({ toggleAge: 1 });
    } else {
      this.setState({ toggleAge: 0 });
    }
    
  }

  handleGenderToggleChange(e) {
    if (this.state.toggleGender === 0) {
      this.setState({ toggleGender: 1 });
    } else {
      this.setState({ toggleGender: 0 });
    }
    
  }
  handleEthnicityToggleChange(e) {
    if (this.state.toggleEthnicity === 0) {
      this.setState({ toggleEthnicity: 1 });
    } else {
      this.setState({ toggleEthnicity: 0 });
    }
    
  }
  handleRelationshipToggleChange(e) {
    if (this.state.toggleRelationship === 0) {
      this.setState({ toggleRelationship: 1 });
    } else {
      this.setState({ toggleRelationship: 0 });
    }
    
  }

  handleRepeatChange(e) {
    let date = new Date();
    let riWeekly = [];
    let riMonthly = [];

    switch (e.target.value) {
      case "none":
        break;
      case "weekly":
        riWeekly = [date.getDay()];
        break;
      case "monthly":
        riMonthly = [date.getDate()];
        break;
      default:
        break;
    }

    this.setState({
      repeatInterval: e.target.value,
      riWeekly: riWeekly,
      riMonthly: riMonthly
    });
  }

  handleSubmitButtonPress() {
    this.props.handleTaskSubmission(Object.assign({}, this.state));
    //this.handleAgeCalculation();
  }

  handleToggleAssignedPerson(person, task) {
    let assignedTo = [];
    if (task.assignedTo == null) {
      assignedTo.push(person.uid);
    } else if (task.assignedTo.includes(person.uid)) {
      task.assignedTo.splice(task.assignedTo.indexOf(person.uid), 1);
      assignedTo = task.assignedTo;
    } else {
      task.assignedTo.push(person.uid);
      assignedTo = task.assignedTo;
    }

    this.setState({
      assignedTo: assignedTo
    });
  }



 // handleDobChange(e) {
 //   this.setState({ dob: e.target.value});
 // }

  render() {


    let ageField;
    let genderField;
    let ethnicityField;
    let relationshipField;

    if (this.state.toggleAge === 1){
      ageField = (
        <div>
          <FormControl
                  autoFocus
                  type="number"
                  placeholder={""}
                  onChange={this.handleAgeFromChange}
                />To:
                <FormControl
                  autoFocus
                  type="number"
                  placeholder={""}
                  onChange={this.handleAgeToChange}
                />
                </div>
        );
    }

    if (this.state.toggleGender === 1){
      genderField = (
          <FormControl
                  componentClass="select"
                  placeholder={""}
                  onChange={this.handleGenderChange}
                  >
                   <option value="male">Male</option>
                  <option value="female">Female</option>
                </FormControl>
        );
    }

    if (this.state.toggleEthnicity === 1){
      ethnicityField = (
          <FormControl
                  componentClass= "select"
                  placeholder={""}
                  onChange={this.handleEthnicityChange}
                  >
                   <option value="indian">American Indian or Alaska Native</option>
                  <option value="asian">Asian</option>
                  <option value="black">Black or African American</option>
                  <option value="hispanic">Hispanic or Latino</option>
                  <option value="white">White</option>
                  <option value="other">Native Hawaiin or Other Pacific Islander</option>
                </FormControl>
        );
    }

    if (this.state.toggleRelationship === 1){
      relationshipField = (
          <FormControl
                  componentClass="select"
                  placeholder={""}
                  onChange={this.handleRelationshipChange}>

                <option value="single">Single</option>
                  <option value="married">Married</option>
            </FormControl>
        );
    }

    return (
      <div>
        <Card id="tabList">
          <CardContent className={this.props.type}>
            <Row>
              <Col xs={3}>
                <Button
                  size="xs"
                  bsStyle="danger"
                  onClick={() => this.props.handleTaskCreationClose()}
                >
                  <small>X</small>
                </Button>
              </Col>
              <Col xs={5} className="pull-right">
                <Button
                  size="xs"
                  bsStyle="success"
                  onClick={() => this.handleSubmitButtonPress()}
                >
                  <small>Save</small>
                </Button>
              </Col>
            </Row>
        </CardContent>
        <CardContent>
          <Row>
              <Col xs={12}>
                <small><b>Study Name</b></small>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.taskName}
                  placeholder={"Enter " + this.props.type + " name"}
                  onChange={this.handleNameChange}
                />
              </Col>

              <Col xs={12} md={6}>
                <small><b>Available Until</b></small>
                <Datetime
                  value={this.state.taskDate}
                  onChange={this.handleDateChange}
                />
              </Col>
              <Col xs={12}>
                <small><b>Compensation</b></small>
                <FormControl
                  autoFocus
                  type="number"
                  placeholder={"Enter compensation for study"}
                  onInput={this.handleCompensationChange}
                />
              </Col>
              <Col xs={12}>
                <small><b>Duration</b></small>
                <FormControl
                  autoFocus
                  type="number"
                  placeholder={"Enter duration of study"}
                  onChange={this.handleDurationChange}
                />
              </Col>
              <Col xs={12}>
                <small><b>Number of Participants</b></small>
                <FormControl
                  autoFocus
                  type="number"
                  placeholder={"Enter number of participants"}
                  onChange={this.handleParticipantsChange}
                />
              </Col>
              <Col xs={12}>
                <small><b>Location/URL</b></small>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.location}
                  placeholder={"Enter location or URL for study"}
                  onChange={this.handleLocationChange}
                />
              </Col>
              <Col xs={12}>
              <small><b>Requirements</b></small>
              <Checkbox onChange={this.handleAgeToggleChange}>Age</Checkbox>{ageField}
              <Checkbox onChange={this.handleGenderToggleChange}>Gender</Checkbox>{genderField}
              <Checkbox onChange={this.handleEthnicityToggleChange}>Ethnicity</Checkbox>{ethnicityField}
              <Checkbox onChange={this.handleRelationshipToggleChange}>Relationship status</Checkbox>{relationshipField}
              </Col>
              <Col xs={12}>
                <small><b>{this.props.type} Description</b></small>
                <FormControl
                  componentClass="textarea"
                  rows="3"
                  value={this.state.taskDescription}
                  placeholder={"Give a description of your " + this.props.type}
                  onChange={this.handleDescChange}
                />
              </Col>
              <Col xs={12}>
                <small><b>Contact Information:</b></small>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder={"Enter contact Information"}
                  onChange={this.handleContactChange}
                />
              </Col>
              
            </Row>
          </CardContent>
        </Card>
      </div>
    );
  }
}
