import React, { Component } from 'react';
import {Button, Glyphicon, Row, Col} from 'react-bootstrap';
import "./index.scss";
import PaymentOverview from './PaymentOverview';
import PaymentList from './PaymentList';
import PaymentCreationForm from './PaymentCreationForm';

export default class MoneySplitting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          payments: [],
          paymentCreation: false,
          listView: false,
          activeTab: 2
        };
    }

    handlePaymentCreateButtonPress() {
        this.paymentCreation = true;
        this.setState({
            paymentCreation: true
        })
    }

    handleViewPayments(payments, listView) {
        this.setState({
            payments: payments,
            listView: listView
        });
    }

    handlePaymentSubmission(payment) {
        let paymentsRef = this.props.database.ref().child('payments');
        let paymentKey = payment.paymentID ? payment.paymentID : paymentsRef.push().key;
        payment.paymentID = paymentKey;
        payment.createDate = new Date(payment.createDate).getTime();
        let updates = {};
        updates[paymentKey] = payment;
        paymentsRef.update(updates);
        this.setState({
          paymentCreation: false
        });
    }

    handlePaymentCreationClose() {
        this.paymentCreation = false;
        this.setState({
            paymentCreation: false,
        });
    }

    handlePaymentCompleted(payment) {
        let paymentKey = payment.paymentID;
        payment.isComplete = 1;
        let updates = {};
        updates['/payments/' + paymentKey] = payment;
        this.props.database.ref().update(updates);
        this.handleViewPayments(this.state.payments, false);
    }

    handleDeletePayment(payment) {
        let paymentKey = payment.paymentID;
        payment.isDeleted = 1;
        let updates = {};
        updates['/payments/' + paymentKey] = payment;
        this.props.database.ref().update(updates);
        this.handleViewPayments(this.state.payments, false);
    }

    render() {
        let createPaymentButton = (
            <Button
                id="addPaymentButton"
                onClick={() => this.handlePaymentCreateButtonPress()}
                block
                >
                <Glyphicon glyph="plus" /> Payment
            </Button>
        );

        let payment_creation = (
            <PaymentCreationForm
                paymentID={null}
                payment={null}
                user={this.props.user}
                groupID={this.props.groupID}
                personsInGroup={this.props.personsInGroup}
                database={this.props.database}
                handlePaymentSubmission={payment=> this.handlePaymentSubmission(payment)}
                handlePaymentCreationClose={() => this.handlePaymentCreationClose()}
                />
        );

        let overview = (
            <div>
                {this.state.paymentCreation ? payment_creation :
                    <Row>
                        <Col xs={3}>

                        </Col>
                        <Col xs={6}>
                            {createPaymentButton}
                        </Col>
                    </Row>}
                <PaymentOverview
                    payments={this.state.payments}
                    user={this.props.user}
                    personsInGroup={this.props.personsInGroup}
                    database={this.props.database}
                    groupID={this.props.groupID}
                    handleViewPayments={(p,v) => this.handleViewPayments(p,v)}
                    />
            </div>
        );

        let list = (
            <div>
                {this.state.paymentCreation ? payment_creation :
                    <Row>
                        <Col xs={3}>
                            <Glyphicon glyph="arrow-left" className="pull-left" onClick={() => this.handleViewPayments([], false)}/>
                        </Col>
                        <Col xs={6}>
                            {createPaymentButton}
                        </Col>
                    </Row>}
                <PaymentList
                payments={this.state.payments}
                user={this.props.user}
                personsInGroup={this.props.personsInGroup}
                database={this.props.database}
                groupID={this.props.groupID}
                handleViewPayments={(p,v) => this.handleViewPayments(p,v)}
                handlePaymentCompleted={payment => this.handlePaymentCompleted(payment)}
                handleDeletePayment={p => this.handleDeletePayment(p)}
                />
            </div>
        );


        return (
            <div className="Payments">
                <h1 id="payment-header">Payments</h1>
                {this.state.listView ? list : overview}
            </div>
        )
    }
}
