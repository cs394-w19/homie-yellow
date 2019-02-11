import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button, Grid} from 'react-bootstrap';
import './index.scss';

export default class PaymentHeader extends Component {
    render() {
        let payment = this.props.payment;
        let style = payment.isComplete ? "success" : "default";

        let payee = this.props.personsInGroup.find(person => person.uid === payment.payeeUID);
        let payer = this.props.personsInGroup.find(person => person.uid === payment.payerUID);
        let header = (<em>This payment's details are unavailable because the payee is not in this group anymore.</em>);
        let button = (<Row>
                        <Col xs={6}>
                            <Button
                                block
                                bsStyle={style}
                                onClick={() => this.props.handleDeletePayment(payment)}
                            >
                                <Glyphicon glyph="remove"/>  Delete
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                block
                                bsStyle={style}
                                onClick={() => this.props.handlePaymentCompleted()}
                            >
                                <Glyphicon glyph="ok"/>  Complete
                            </Button>
                        </Col>
                    </Row>);
        if(payee !== undefined && payer !== undefined) {
            header = payer !== undefined ? payer.name + " owes you $" + payment.amount : null;
            button = (<Row>
                        <Col xs={3} />
                        <Col xs={6}>
                            <Button
                                block
                                bsStyle={style}
                                onClick={() => this.props.handleDeletePayment(payment)}
                            >
                                <Glyphicon glyph="remove"/>  Delete
                            </Button>
                        </Col>
                    </Row>);
            if (payer.uid === this.props.user.uid && payee !== undefined) {
                header = "You owe " + payee.name + " $" + payment.amount;
                button = (<Row>
                            <Col xs={3} />
                            <Col xs={6}>
                                <Button
                                        block
                                        bsStyle={style}
                                        onClick={() => this.props.handlePaymentCompleted(payment)}
                                    >
                                        <Glyphicon glyph="ok"/>  Complete
                                    </Button>
                            </Col>
                        </Row>);
            }
        }

      return(
        <Grid>
            <Row>
                <h3>{header}</h3>
                <em> Created: {new Date(1 * payment.createDate).toDateString()} </em>
            </Row>
            {button}
        </Grid>
      );
    }
}
