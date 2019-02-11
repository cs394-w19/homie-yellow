import React, { Component } from "react";
import { Row, Col, FormControl, ControlLabel, Button, Glyphicon} from "react-bootstrap";
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
  }

  componentDidMount() {
    if (this.props.payment) {
      this.setState(this.props.payment);
    }
  }


  handleSubmitButtonPress() {
    this.props.handlePaymentSubmission(Object.assign({}, this.state));
  }

  render() {

   /* let user_options = this.props.personsInGroup.map((person) => {
        if(person.uid !== this.props.user.uid) {
            return (
                <option id='{person.uid}'>person.name </option>
            );
        }
    });*/
    return (
      <div id="payment-creation">
        <Card>
            <CardContent>
                <Row>
                    <Col xs={8}>
                        <FormControl
                        type="text"
                        /*value={this.state.taskName}*/
                        placeholder="0.00"
                        onChange={this.handleNameChange}
                        />
                    </Col>
                    <Col xs={4}>
                        <Button onClick={() => this.props.handlePaymentCreationClose()}>
                            <Glyphicon glyph="remove" />
                        </Button>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={8}>
                    <UserSelectList
                        personsInGroup={this.props.personsInGroup}
                        user={this.props.user}
                    />
                    </Col>
                    <Col xs={4}>
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
