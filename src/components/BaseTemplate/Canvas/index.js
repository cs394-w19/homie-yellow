import React, {Component} from 'react';
import TaskList from '../../TaskList';
import Calendar from '../../Calendar';
import Settings from '../../Settings';
import MoneySplitting from '../../MoneySplitting';

import './index.css';

export default class Canvas extends Component {
  render() {
    let canvas = "";

    switch (this.props.activeTab) {
      case 0:
        canvas = <h1>Welcome to Homie</h1>;
        break;
      case 1:
        canvas = <TaskList
                    user={this.props.user}
                    personsInGroup={this.props.personsInGroup}
                    database={this.props.database}
                    groupID={this.props.groupID}
                  />;
        break;
      case 3:
        canvas = <Calendar
                    user={this.props.user}
                    personsInGroup={this.props.personsInGroup}
                    database={this.props.database}
                    groupID={this.props.groupID}
                  />;
        break;
      case 4:
        canvas = <Settings
                    user={this.props.user}
                    groupID={this.props.groupID}
                    personsInGroup={this.props.personsInGroup}
                    database={this.props.database}
                    handleLogOut={() => this.props.handleLogOut()}
                  />;
        break;
      default:
        canvas = <h1>Page Not Found.</h1>;
    }

    return(<div id="canvas"> {canvas} </div>);
  }
}
