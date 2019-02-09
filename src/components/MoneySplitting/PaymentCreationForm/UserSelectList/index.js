import React, { Component } from "react";
import {Form, FormControl} from 'react-bootstrap';
import Select from 'react-select';
import "./index.scss";

export default class UserSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

        handleChange = (selectedOption) => {
          this.setState({value: selectedOption});
          console.log(`Option selected:`, selectedOption);
        }
        render() {
          let options = [];
          this.props.personsInGroup.forEach((person) => {
              if(person.uid != this.props.user.uid) {
                  options.push({value: person.uid, label: person.name});
              }
          })
          console.log(options);
      
          return (
            <Select
              value={this.state.value}
              onChange={this.handleChange}
              options={options}
              isOpen
            />
          );
        }
      }


