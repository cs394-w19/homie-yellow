import React, { Component } from "react";
import TaskHeader from "./TaskHeader";
import TaskDetails from "./TaskDetails";
import TaskCreationForm from "../TaskCreationForm";
import "./index.scss";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  /*card: {
    maxWidth: 400,
  },*/
  media: {
    height: 0
    //paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    marginRight: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class TaskItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: false,
      editorOpen: false
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleEditTask() {
    if (this.props.user.uid === this.props.task.taskCreator) {
      this.setState({
        editorOpen: true
      });
    }
  }

  handleTaskSubmission(task) {
    this.setState({
      editorOpen: false
    });
    this.props.handleTaskSubmission(task);
  }
  handleTaskCreationClose() {
    this.setState({
      editorOpen: false
    });
    this.props.handleTaskCreationClose();
  }

  render() {
    const { classes } = this.props;
    let type =
      this.props.task.taskType === "Chore" ? "choreClass" : "purchaseClass";

    if (this.state.editorOpen) {
      return (
        <TaskCreationForm
          taskID={this.props.task.taskID}
          task={this.props.task}
          user={this.props.user}
          personsInGroup={this.props.personsInGroup}
          type={this.props.task.taskType}
          database={this.props.database}
          handleTaskSubmission={task => this.handleTaskSubmission(task)}
          handleTaskCreationClose={() => this.handleTaskCreationClose()}
        />
      );
    }
    // if not return a vanilla card:)
    return (
      <Card className={classes.card} id="tabList">
        <CardContent
          className={type}
          id="cardContent"
          onClick={this.handleExpandClick}
        >
          <TaskHeader
            task={this.props.task}
            personsInGroup={this.props.personsInGroup}
            handleTaskCompleted={() => this.props.handleTaskCompleted()}
          />
        </CardContent>
        <CardActions
          className={type}
          disableActionSpacing
          id="cardActions"
          onClick={this.handleExpandClick}
        >
          <IconButton
            id="arrowButton"
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
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
              personsInGroup={this.props.personsInGroup}
              task={this.props.task}
              handleDeleteTask={t => this.props.handleDeleteTask(t)}
              handleEditTask={() => this.handleEditTask()}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskItem);
