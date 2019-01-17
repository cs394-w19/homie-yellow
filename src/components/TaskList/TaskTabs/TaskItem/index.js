import React, { Component } from 'react';
import TaskHeader from './TaskHeader';
import TaskDetails from './TaskDetails';
import './index.scss';
import {Panel} from 'react-bootstrap';


export default class TaskItem extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        open: true,
      };
    }

    render() {
      let type = this.props.task.taskType === "Chore" ? "choreClass" : "purchaseClass";
      return(
        <Panel id="tabList">
          <Panel.Heading className={type}>
            <Panel.Title toggle>
              <TaskHeader
                task={this.props.task}
                handleTaskCompleted={() => this.props.handleTaskCompleted()}
              />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <TaskDetails
                task={this.props.task}
                handleToggleAssignedPerson={(p, t) => this.props.handleToggleAssignedPerson(p, t)}
                handleToggleAssignedType={(p, t) => this.props.handleToggleAssignedType(p, t)}
              />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>

      );
    }
}
