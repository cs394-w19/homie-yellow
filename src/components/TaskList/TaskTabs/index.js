import React, { Component } from "react";
import { Tabs, Tab, Checkbox, FormControl, Button, Dropdown, ToggleButtonGroup, ToggleButton, ButtonToolbar } from "react-bootstrap";
import TaskItem from "./TaskItem";
import TaskCreationForm from "./TaskCreationForm";
import "./index.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
/*import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';*/

export default class TaskTabs extends Component {
    constructor(props) {
      super(props)
      this.state = {
        group_tasks: [],
        groupAdmin: 0,
        groupName: "",
        filter: "",
        displayVal: "comp",
      };
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.handleDisplayChange = this.handleDisplayChange.bind(this);
    }

    componentDidMount(prevProps) {
      this.getGroupTasks();
    }



    handleFilterChange(e) {
      this.setState({ filter: e.target.value });
    }

     handleDisplayChange(e) {
      this.setState({ displayVal: e.target.value });
    }


    componentDidUpdate(prevProps) {
      if (prevProps.groupID !== this.props.groupID) {
        this.getGroupTasks();
      }
    }

    getGroupTasks() {
      let ref = this.props.database.ref('taskList/');
      ref.orderByChild("groupID").equalTo(this.props.groupID).on("value", (data) => {
        let group_tasks = [];
        data.forEach((child) => {
            group_tasks.push(child.val());
        });
        group_tasks.sort((a,b) => { return a.taskDate - b.taskDate; });
        this.setState({
            group_tasks: group_tasks,
        })
      })
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
    }

    render() {
      let activeTab = this.props.activeTab;
      let tabNames = ["All Studies", "My Studies"];
      let render_tasks = [];
      let currUser = this.props.personsInGroup.find(person => {
        return person.uid === this.props.user.uid;
      });


      switch (activeTab) {
        case 0: // active
          if (this.props.user.uid === this.state.groupAdmin) {
            if (this.state.filter === "") {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'         
              );
            }
            if ((this.state.filter === "none")) {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'        
              );
            }
            if ((this.state.filter === "avail")) {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event' && task.taskType !== '(expired)' && task.taskType !== '(full)'
            );  
            }
            if ((this.state.filter === "soon")) {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event' && task.taskType !== '(expired)'
            );
              render_tasks = render_tasks.sort((a,b) => a.taskDate - b.taskDate);
            }
            if ((this.state.filter === "comp")) {
              render_tasks = (this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'
            )).sort((a,b) => b.compensation - a.compensation);
            }

          } else {
            if (this.state.filter === "") {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'         
              );
            }
            if ((this.state.filter === "none")) {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'        
              );
            }
            if ((this.state.filter === "avail")) {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event' && task.taskType !== '(expired)' && task.taskType !== '(full)' && task.taskType !== '(not eligible)'
            );  
            }
            if ((this.state.filter === "soon")) {
              render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event' && task.taskType !== '(expired)'
            );
              render_tasks = render_tasks.sort((a,b) => a.taskDate - b.taskDate);
            }
            if ((this.state.filter === "comp")) {
              render_tasks = (this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'
            )).sort((a,b) => b.compensation - a.compensation);
            }
          }
          break;        
        case 1: // assigned to me
          if (this.props.user.uid === this.state.groupAdmin) {
            render_tasks = this.state.group_tasks.filter(
            task => !task.isComplete && !task.isDeleted && task.taskType !== 'Event'         
           );
          } else {
            render_tasks = this.state.group_tasks.filter(task => {
            if (!task.assignedTo) return false;
            return (
              task.assignedTo.indexOf(currUser.uid) > -1 &&
              !task.isComplete &&
              !task.isDeleted &&
              task.taskType !== 'Event'
            );
          });
          }
          
          break;
        case 2: // completed
          render_tasks = this.state.group_tasks.filter(
            task => task.isComplete && !task.isDeleted && task.taskType !== 'Event'
          );
          break;
        default:
          break;
      }


      let task_items = render_tasks.map(task => {
        return (
          <TaskItem
            key={task.taskID}
            task={task}
            user={this.props.user}
            handleTaskCompleted={() => this.props.handleTaskCompleted(task)}
            handleDeleteTask={t => this.props.handleDeleteTask(t)}
            handleSignUpTask={t => this.props.handleSignUpTask(t)}
            groupID={this.props.groupID}
            personsInGroup={this.props.personsInGroup}
            handleTaskSubmission={t => this.props.handleTaskSubmission(t)}
            handleTaskCreationClose={() => this.props.handleTaskCreationClose()}
            page = {this.props.page}
            pgender = {this.props.pgender}
            pethnicity = {this.props.pethnicity}
            prelationship = {this.props.prelationship}
            displayVal={this.state.displayVal}
          />
        );
      });

      if (!task_items.length) task_items = <Card id="tab"><CardContent id="card"><h4>There are currently no studies.</h4></CardContent></Card>;

      let showFilter; 
      let showDisplayValue; 

      if ((this.props.user.uid !== this.state.groupAdmin)) {
        showFilter = (
              <p className="sort">Sort by:
              <FormControl
                    componentClass= "select"
                    placeholder={""}
                    onChange={this.handleFilterChange}
                    >
                    <option value="none">All</option>
                    <option value="avail">Available</option>
                    <option value="comp">Highest compensation</option>
                    <option value="soon">Expiring soon</option>
                  </FormControl>
                </p>

            );

        showDisplayValue = (
          <p className="display">Show:
              <FormControl
                    componentClass= "select"
                    placeholder={""}
                    onChange={this.handleDisplayChange}
                    >
                    <option value="comp">Compensation</option>
                    <option value="dur">Duration</option>
                    <option value="date">Date</option>
                    <option value="loc">Location</option>
                    <option value="par">Participants</option>
                  </FormControl>
                </p>
          );

      }

      if ((this.props.user.uid === this.state.groupAdmin)) {
        showFilter = (
              <p className="sort">Sort by:
              <FormControl
                    componentClass= "select"
                    placeholder={""}
                    onChange={this.handleFilterChange}
                    >
                    <option value="none">All</option>
                    <option value="avail">Available</option>
                    <option value="comp">Highest compensation</option>
                    <option value="soon">Expiring soon</option>
                  </FormControl>
                </p>

            );

        showDisplayValue = (
          <p className="display">Show:
              <FormControl
                    componentClass= "select"
                    placeholder={""}
                    onChange={this.handleDisplayChange}
                    >
                    <option value="comp">Compensation</option>
                    <option value="dur">Duration</option>
                    <option value="date">Date</option>
                    <option value="loc">Location</option>
                    <option value="par">Participants</option>
                  </FormControl>
                </p>
          );

      }

      let tabs = tabNames.map((name, i) => {
        return (
          <Tab title={name} key={name} eventKey={i} className="a-tab">
            {task_items}
          </Tab>
        );
      });

      let taskCreationForm = this.props.taskCreation ? (
        <TaskCreationForm
          taskID={null}
          groupID={this.props.groupID}
          task={null}
          user={this.props.user}
          personsInGroup={this.props.personsInGroup}
          type={this.props.taskCreation}
          database={this.props.database}
          handleTaskSubmission={task => this.props.handleTaskSubmission(task)}
          handleTaskCreationClose={() => this.props.handleTaskCreationClose()}
        />
      ) : (
        <div />
      );

      return (

        <div id="tabList">
          <Tabs
            id="TaskTabs"
            activeKey={activeTab}
            onSelect={t => this.props.handleTabPress(t)}
            animation={false}
          >
            {taskCreationForm}
            {showDisplayValue}
            {showFilter}
            {tabs}
          </Tabs>
        </div>
      );
    }
}
