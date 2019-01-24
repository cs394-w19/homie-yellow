import React, { Component } from 'react';
import TaskHeader from './TaskHeader';
import TaskDetails from './TaskDetails';
import TaskCreationForm from '../TaskCreationForm';
import './index.scss';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  /*card: {
    maxWidth: 400,
  },*/
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class TaskItem extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        expanded: false,
        editorOpen: false,
      };
    }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleEditTask() {
    this.setState({
      editorOpen: true,
    });
  }

  render() {
    const { classes } = this.props;
    let type = this.props.task.taskType === "Chore" ? "choreClass" : "purchaseClass";

    if (this.state.editorOpen) {
      return(
        <TaskCreationForm
          personsInGroup={this.props.personsInGroup}
          type={this.props.task.taskType}
          database={this.props.database}
          handleTaskSubmission={(task) => this.props.handleTaskSubmission(task)}
        />
      );
    }
    // if not return a vanilla card:)
    return (
      <Card className={classes.card} id="tabList">
        <CardContent
        className={type}
        id="cardContent"
        onClick={this.handleExpandClick}>
            <TaskHeader
                task={this.props.task}
                handleTaskCompleted={() => this.props.handleTaskCompleted()}
              />
        </CardContent>
        <CardActions
        className={type} disableActionSpacing
        id="cardActions"
        onClick={this.handleExpandClick}>
          <IconButton id="arrowButton"
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}

            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <TaskDetails
                task={this.props.task}
                handleToggleAssignedPerson={(p, t) => this.props.handleToggleAssignedPerson(p, t)}
                handleToggleAssignedType={(p, t) => this.props.handleToggleAssignedType(p, t)}
                handleDeleteTask={(t) => this.props.handleDeleteTask(t)}
                handleEditTask={() => this.handleEditTask()}
              />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskItem);
