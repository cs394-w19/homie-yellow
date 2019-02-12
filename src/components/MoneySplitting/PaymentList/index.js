import React, { Component } from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import "./index.scss";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PaymentItem from './PaymentItem';

export default class MoneySplitting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          paymentCreation: false,
          whatCurrUserOwes: [],
          whatCurrUserIsOwed: []
        };
    }

    render() {
        let payments = this.props.payments;
        let payment_items = (
            <PaymentItem
                    key={payments.paymentID}
                    payment={payments}
                    user={this.props.user}
                    handlePaymentCompleted={() => this.props.handlePaymentCompleted(payments)}
                    handleDeletePayment={p => this.props.handleDeletePayment(p)}
                    groupID={this.props.groupID}
                    personsInGroup={this.props.personsInGroup}
                    handleTaskSubmission={t => this.props.handleTaskSubmission(t)}
                    handleTaskCreationClose={() => this.props.handleTaskCreationClose()}
                />
        );
        console.log(payments);
        if(Array.isArray(payments)) {
            payment_items = payments.map(payment=> {
                return (
                <PaymentItem
                    key={payment.paymentID}
                    payment={payment}
                    user={this.props.user}
                    handlePaymentCompleted={() => this.props.handlePaymentCompleted(payment)}
                    handleDeletePayment={p => this.props.handleDeletePayment(p)}
                    groupID={this.props.groupID}
                    personsInGroup={this.props.personsInGroup}
                    handleTaskSubmission={t => this.props.handleTaskSubmission(t)}
                    handleTaskCreationClose={() => this.props.handleTaskCreationClose()}
                />
                );
            });

        }
        return (
            <div className="payment_items">{payment_items}</div>
        );
    };
}
