import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import TaskItem from './TaskItem';
import './index.scss';

export default class TaskTabs extends Component {

    render() {

      let tasks = this.props.tasks;
      let ref = this.props.database.ref('taskList/');
      let activeTab = this.props.activeTab;
      let tabNames = ["Active", "Assigned to Me", "Completed"];
      let currUser = 'Jenny';
      let data_list = [];
      switch(activeTab) {
        case 0: // active
          ref.orderByChild("isComplete").equalTo(false).on("value", (data) => {
            data.forEach((child) => {
              data_list.push(child.val());
            });
          });
          break;
        case 1: // assigned to me
          ref.orderByChild("assignedTo").on("value", (data)  =>{
            data.forEach((child) => {
              data_list.push(child.val());
            })
          });
          break;
        case 2: // completed
          ref.orderByChild("isComplete").equalTo(true).on("value", (data) => {
            data.forEach((child) => {
              data_list.push(child.val());
            })
          });
          break;
        default:
          data_list = [];
          break;
      }
    
      let task_items = data_list.map((task) => {
        return(
            <TaskItem
              key={task.taskModified}
              task={task}
              handleTaskCompleted={() => this.props.handleTaskCompleted(task)}
              handleToggleAssignedPerson={(p, t) => this.props.handleToggleAssignedPerson(p, t)}
              handleToggleAssignedType={(p, t) => this.props.handleToggleAssignedType(p, t)}
            />
        );
      });

     if (!task_items.length)
        task_items = <p>There are no tasks currently.</p>;

      let tabs = tabNames.map((name, i) => {
          return(
            <Tab title={name} key={name} eventKey={i}>
              {task_items}
            </Tab>
          );
      });
      return(
        <Tabs
          activeKey={activeTab}
          onSelect={(t) => this.props.handleTabPress(t)}
          id="tabList"
          animation={false}
        >
            {tabs}
        </Tabs>
      );
    }
}
