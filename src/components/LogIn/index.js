import React, { Component } from "react";
import { FormGroup, ControlLabel, Button } from "react-bootstrap";
import "./index.scss";
import { FormControl } from "@material-ui/core";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeTab: 0,
      taskCreation: 0,
      personsInGroup: [],
      editorOpen: 0
    };
  }

  render() {
    let page = <form> </form>;
    return page;
  }
}
