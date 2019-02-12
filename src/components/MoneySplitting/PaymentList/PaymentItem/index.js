import React, { Component } from "react";
import PaymentHeader from "./PaymentHeader";
//import PaymentCreationForm from "../PaymentCreationForm";
import "./index.scss";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  /*card: {
    maxWidth: 400,
  },*/
  media: {
    height: 0
    //paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    marginRight: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class PaymentItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: true,
      editorOpen: false
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleEditPayment() {
    this.setState({
      editorOpen: true
    });
  }

  handlePaymentSubmission(payment) {
    this.setState({
      editorOpen: false
    });
    this.props.handlePaymentSubmission(payment);
  }
  handlePaymentCreationClose() {
    this.setState({
      editorOpen: false
    });
    this.props.handlePaymentCreationClose();
  }

  render() {
    return (
      <Card className="cardStyle">
        <CardContent
          className="cardContentStyle"
          id="cardContent"
        >
          <PaymentHeader
            payment={this.props.payment}
            personsInGroup={this.props.personsInGroup}
            handlePaymentCompleted={() => this.props.handlePaymentCompleted()}
            handleDeletePayment={p => this.props.handleDeletePayment(p)}
            user={this.props.user}
          />
        </CardContent>
      </Card>
    );
  }
}

PaymentItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentItem);
