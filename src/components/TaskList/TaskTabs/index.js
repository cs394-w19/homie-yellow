import React, { Component } from 'react';
import {Panel, Tabs, Tab} from 'react-bootstrap';
import TaskItem from '../TaskItem';

export default class TaskTabs extends Component {

    render() {

      let tasks = this.props.tasks;
      let activeTab = this.props.activeTab;
      let tabNames = ["Assigned to Me", "Active", "Completed"];

      let filtered_tasks = tasks.filter((task) => {
        let filtered = false;
        switch(activeTab) {
          case 0: // assigned to me
            filtered = task.assignedTo.includes('Jenny') && !task.isComplete;
            break;
          case 1: // active
            filtered = !task.isComplete;
            break;
          case 2: // completed
            filtered = task.isComplete;
            break;
          default:
            filtered = true;
            break;
        }
        return(filtered);
      });

      let task_items = filtered_tasks.map((task) => {
        return(
            <TaskItem 
              key={task.taskModified} 
              task={task} 
              handleTaskCompleted={() => this.props.handleTaskCompleted(task)}
            />
        );
      });
  
      if (!task_items.length)
        task_items = <p>There are no tasks currently.</p>;
  
      let tabs = tabNames.map((name, i) => {
          return(
            <Tab title={name} eventKey={i}>
              {task_items}
            </Tab>
          );
      });
      return(
        <Tabs 
          activeKey={activeTab}
          onSelect={(t) => this.props.handleTabPress(t)}
          id="tabList"
        >
            {tabs}
        </Tabs>
      );
    }
}