import React, { Component } from 'react';
import {Checkbox, Radio, Row, Col, Glyphicon, Button} from 'react-bootstrap';


export default class TaskAssignedToCheckboxes extends Component {

    render() {
        let task = this.props.task;

        let editAssignedField = this.props.personsInGroup.map((person) => {
            let assigned = (task.assignedTo == null) ? '' : task.assignedTo.includes(person);
            return(
                <span key={person}>
                    <Checkbox
                    name={person}
                    inline
                    onChange={() => this.props.toggleAssignedPerson(person, task)}
                    checked={assigned}
                    >
                    {person}
                    </Checkbox>{' '}
                </span>
            );
        });

        return(
            <div>
                {editAssignedField}
            </div>
        );
    }
}