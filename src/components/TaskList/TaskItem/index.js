import React, { Component } from 'react';
import TaskHeader from './TaskHeader';
import TaskDetails from './TaskDetails';
import './index.scss';
import {Panel} from 'react-bootstrap';

export default class TaskItem extends Component {
    render() {
      return(
        <Panel>
          <Panel.Heading>
            <TaskHeader task={this.props.task} handleTaskCompleted={() => this.props.handleTaskCompleted()} />
          </Panel.Heading>
          <Panel.Body>
            <TaskDetails task={this.props.task} />
          </Panel.Body>
        </Panel>
      );
    }
}
