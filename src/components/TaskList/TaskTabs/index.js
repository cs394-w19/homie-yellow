import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import TaskItem from './TaskItem';

export default class TaskTabs extends Component {

    render() {

      let tasks = this.props.tasks;
      console.log(tasks);
      let activeTab = this.props.activeTab;
      let tabNames = ["Active", "Assigned to Me", "Completed"];
      let currUser = 'Jenny';

      let filtered_tasks = tasks.filter((task) => {
        let filtered = false;
        switch(activeTab) {
          case 0: // assigned to me
            filtered = !task.isComplete;
            break;
          case 1: // active
            filtered = task.assignedTo.includes(currUser) && !task.isComplete;
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
        >
            {tabs}
        </Tabs>
      );
    }
}
