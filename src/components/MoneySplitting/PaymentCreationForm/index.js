import React, { Component } from "react";
import { Row, Col, FormControl, Button, Glyphicon} from "react-bootstrap";
import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import UserSelectList from "./UserSelectList";

export default class PaymentCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: 0,
      amount: 0,
      payeeUID: this.props.user.uid,
      groupID: this.props.groupID,
      createDate: Date.now(),
      isComplete: false,
      payerUID: "",
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  componentDidMount() {
    if (this.props.payment) {
      this.setState(this.props.payment);
    }
  }
  handleAmountChange(e){

    this.setState({
        amount: e.target.value
    });
  }

  handleSubmitButtonPress() {

    this.props.handlePaymentSubmission(Object.assign({}, this.state));
  }

  handlePayerSelection(uid) {
      this.setState({
        payerUID: uid
      });
  }

  render() {
    return (
      <div id="payment-creation">
        <Card>
            <CardContent>
                <Row>
                    <Col xs={8}>
                        <FormControl
                        type="number"
                        placeholder="0.00"
                        onChange={this.handleAmountChange}
                        />
                    </Col>
                    <Col xs={4}>
                        <Button bsStyle="danger"
                                className="pull-right"
                                onClick={() => this.props.handlePaymentCreationClose()}
                        >
                            <Glyphicon glyph="remove" />
                        </Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={8} id="userList">
                    <UserSelectList
                        personsInGroup={this.props.personsInGroup}
                        user={this.props.user}
                        handlePayerSelection={(uid) => this.handlePayerSelection(uid)}
                        payerUID={this.state.payerUID}
                    />
                    </Col>
                    <Col xs={4}>
                        <br />
                        <Button
                        bsStyle="success"
                        onClick={() => this.handleSubmitButtonPress()}
                        >
                        Create
                        </Button>
                    </Col>
                </Row>
            </CardContent>
        </Card>
      </div>
    );
  }
}
