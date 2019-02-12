import React, { Component } from "react";
import "./index.scss";

export default class UserSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payerUID: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            payerUID: e.target.value,
        });
        this.props.handlePayerSelection(e.target.value);
    }

    render() {
      let editAssignedField = this.props.personsInGroup.map(person => {
        if (person.uid !== this.props.user.uid) return('');
        return (
          <option key={person.uid} value={person.uid}>
              {person.name}
          </option>
        );
      });

      return (
        <div>
          <label>
            Who needs to pay:
            <select value={this.state.payerUID} onChange={this.handleChange}>
                <option value=""> Select... </option>
              {editAssignedField}
            </select>
          </label>
        </div>
      );
    }

  }
