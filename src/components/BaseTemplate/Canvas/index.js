import React, {Component} from 'react';
import TaskList from '../../TaskList';
import Calendar from '../../Calendar';
import Settings from '../../Settings';

export default class Canvas extends Component {
  render() {
    let canvas = <h1>Page Not Found.</h1>;
    if(this.props.user == null) {
      return(<h1>Please log in</h1>);
    }

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
      case 2:
        canvas = <h1>Splitting</h1>;
        break;
      case 3:
        canvas = <Calendar database={this.props.database} />;
        break;
      case 4:
        canvas = <Settings
                    user={this.props.user}
                    handleLogOut={() => this.props.handleLogOut()}/>;
        break;
      default:
        canvas = <h1>Page Not Found.</h1>;
    }

    return(canvas);
  }
}