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
        <Panel id="collapsible-panel" id="tabList">
          <Panel.Heading className={type}>
            <Panel.Title toggle>
              <TaskHeader task={this.props.task} handleTaskCompleted={() => this.props.handleTaskCompleted()} />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <TaskDetails task={this.props.task} />
            </Panel.Body>
          </Panel.Collapse>
        </Panel>

      );
    }
}
