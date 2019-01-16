import React, { Component } from 'react';
import TaskHeader from './TaskHeader';
import TaskDetails from './TaskDetails';
import './index.scss';
import {Panel, Tabs, Tab} from 'react-bootstrap';

export default class TaskItem extends Component {
    render() {
      return(
        <Tabs>
          <Tab title="Active">
            <Panel className="TaskItem">
            <Panel.Body>
              <TaskHeader task={this.props.task} />
              <TaskDetails task={this.props.task} />
              </Panel.Body>
            </Panel>
          </Tab>
          <Tab title="Complete">
            <Panel className="TaskItem">
              <Panel.Body>
                <TaskHeader task={this.props.task} />
                <TaskDetails task={this.props.task} />
              </Panel.Body>
            </Panel>
          </Tab>
          <Tab title="On Hold">
            <Panel className="TaskItem">
              <Panel.Body>
                <TaskHeader task={this.props.task} />
                <TaskDetails task={this.props.task} />
              </Panel.Body>
            </Panel>
          </Tab>
          </Tabs>
      );
    }
}
