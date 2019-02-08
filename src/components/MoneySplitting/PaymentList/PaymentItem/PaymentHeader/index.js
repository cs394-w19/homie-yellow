import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button, Grid} from 'react-bootstrap';
import './index.scss';

export default class PaymentHeader extends Component {
    render() {
      let payment = this.props.payment;
      console.log(this.props);
      let style = payment.isComplete ? "success" : "default";

      let payee = this.props.personsInGroup.find(person => person.uid === payment.payeeUID);
      let payer = this.props.personsInGroup.find(person => person.uid === payment.payerUID);
      let header = payer.name + " owes you $" + payment.amount;
      if (payer.uid === this.props.user.uid) {
        header = "You owe " + payee.name + " $" + payment.amount;
      }

      return(
        <Grid>
            <Row>
                <h3>{header}</h3>
            </Row>
            <Row>
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
            </Row>
        </Grid>
      );
    }
}
