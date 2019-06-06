import React, { Component } from "react";
import { Button, Glyphicon, ToggleButtonGroup, ToggleButton, ButtonToolbar } from "react-bootstrap";
import TaskTabs from "./TaskTabs";
import "./index.scss";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pgender: "",
      pethnicity: "",
      prelationship: "",
      tasks: [],
      activeTab: 0,
      taskCreation: false,
      editorOpen: false,
      groupAdmin: 0,
      groupName: "None",
      userName: "None",
      uid: this.props.user.uid,
    };
  }

  componentDidMount() {
    let groupID = this.props.groupID;
    let groups = this.props.database.ref().child("groups");
    groups.on('value', data => {
      let groupAdmin = 0;
      let groupName = "None";
      data.forEach(elem => {
        if (elem.val().groupID === groupID) {
          groupAdmin = elem.val().groupAdmin;
          groupName = elem.val().groupName;
        }
      });
      this.setState({
        groupAdmin: groupAdmin,
        groupName: groupName,
      })
    });
    let users = this.props.database.ref().child("users");
    users.on('value', data => {
      let name = "None";
      let uid = 0;
      data.forEach(elem => {
        if ((elem.val().groupID === groupID) && (elem.val().uid === this.state.uid)) {
          name = elem.val().name;
          uid = elem.val().uid;
        }
      });
      this.setState({
        userName: name,
        uid: uid,
      })
    });
    let participants = this.props.database.ref().child("participants");
    participants.on('value', data => {
      let dob = '';
      
      let tm = Date.now() + 1970*365*24*60*60*1000;
      let ethnicity = '';
      let gender = '';
      let relationship = '';
      data.forEach(elem => {
        if (elem.val().uid === this.state.uid) {
          dob = elem.val().age;
          ethnicity = elem.val().ethnicity;
          relationship = elem.val().relationship;
          gender = elem.val().gender;
        }
      });
      let d = Number(dob.substring(0,4))*365*24*60*60*1000 + Number(dob.substring(5,7))*30*24*60*60*1000 + Number(dob.substring(8,10))*24*60*60*1000;
      let age = (tm-d)/(1000*60*60*24*365);
      age = age - (age % 1);
      this.setState({
        page: age,
        pgender: gender,
        pethnicity: ethnicity,
        prelationship: relationship,
      })
    });
  }

  handleTaskCreateButtonPress(type) {
    this.setState({
      taskCreation: type
    });
  }

  handleTaskCreationClose() {
    this.setState({
      taskCreation: false,
      editorOpen: false
    });
  }

  handleTabPress(tab) {
    this.setState({
      activeTab: tab
    });
  }

  handleTaskSubmission(task) {
    let taskListRef = this.props.database.ref().child('taskList');
    let taskKey = task.taskID ? task.taskID : taskListRef.push().key;
    task.taskID = taskKey;
    task.taskDate = new Date(task.taskDate).getTime();
    let updates = {};
    updates[taskKey] = task;
    taskListRef.update(updates);
    this.setState({
      taskCreation: false
    });
  }

  handleTaskCompleted(task) {
      let taskAssignee = task.assignedTo
      if (taskAssignee === undefined) {
        let taskKey = task.taskID;
        task.isComplete = !task.isComplete;
        task.taskDate = new Date(task.taskDate).getTime();
        let updates = {};
        updates['/taskList/' + taskKey] = task;
        this.props.database.ref().update(updates);
      }
      else {
        for (let i = 0; i <= (taskAssignee.length); i++) {
          if (this.props.user.uid === taskAssignee[i]) {
            let taskKey = task.taskID;
            task.isComplete = !task.isComplete;
            task.taskDate = new Date(task.taskDate).getTime();
            let updates = {};
            updates['/taskList/' + taskKey] = task;
            this.props.database.ref().update(updates);
          }
        }
      }
  }

  handleDeleteTask(task) {
    let taskKey = task.taskID;
    task.isDeleted = 1;
    task.taskDate = new Date(task.taskDate).getTime();
    let updates = {};
    updates['/taskList/' + taskKey] = task;
    this.props.database.ref().update(updates);
  }

  handleSignUpTask(task) {
    if ((task.participants > 0) && (task.assignedTo !== this.props.user.uid)){
      task.assignedTo = this.props.user.uid;
      task.participants = task.participants - 1;
      this.forceUpdate();
    }
      
  }




  render() {


    let createTaskButtons;

    if (this.props.user.uid === this.state.groupAdmin) {
      createTaskButtons = (
      <div>
        <Button
          id="addChoreButton"
          onClick={() => this.handleTaskCreateButtonPress("Study")}
        >
          <Glyphicon glyph="plus" /> Create New Study
        
        </Button>

      </div>
      );
    }

    let task_tabs = (
      <TaskTabs
        task = {this.props.task}
        user={this.props.user}
        tasks={this.state.tasks}
        database={this.props.database}
        groupID={this.props.groupID}
        personsInGroup={this.props.personsInGroup}
        activeTab={this.state.activeTab}
        taskCreation={this.state.taskCreation}
        handleTabPress={t => this.handleTabPress(t)}
        handleTaskSubmission={task => this.handleTaskSubmission(task)}
        handleTaskCompleted={task => this.handleTaskCompleted(task)}
        handleDeleteTask={t => this.handleDeleteTask(t)}
        handleSignUpTask={t => this.handleSignUpTask(t)}
        handleTaskCreationClose={() => this.handleTaskCreationClose()}
        page = {this.state.page}
        pgender = {this.state.pgender}
        pethnicity = {this.state.pethnicity}
        prelationship = {this.state.prelationship}
      />
    );

    const tasklist = (
      <div>
        <div className="TaskList">
          <h1>{this.state.groupName} Studies</h1>
          {createTaskButtons}
          {task_tabs}
        </div>
      </div>
    );

    let pageToReturn = tasklist;

    return pageToReturn;
  }
}
