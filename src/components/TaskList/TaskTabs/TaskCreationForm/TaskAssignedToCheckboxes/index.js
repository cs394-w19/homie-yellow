import React, { Component } from 'react';
import {Checkbox} from 'react-bootstrap';


export default class TaskAssignedToCheckboxes extends Component {

    render() {
        let task = this.props.task;

        let editAssignedField = this.props.personsInGroup.map((person) => {
            let assigned = (task.assignedTo == null) ? '' : task.assignedTo.includes(person.uid);
            return(
                <span key={person.uid}>
                    <Checkbox
                    name={person.name}
                    inline
                    onChange={() => this.props.toggleAssignedPerson(person, task)}
                    checked={assigned}
                    >
                    {person.name}
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
