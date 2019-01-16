import React, { Component } from 'react';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      return(
        <div className="TaskHeader">
          <h2>{this.props.task.taskName}</h2>
        </div>
      );
    }
}
