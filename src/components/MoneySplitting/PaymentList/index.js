import React, { Component } from 'react';
import "./index.scss";
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
