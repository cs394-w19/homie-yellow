import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import "./index.scss";

export default class PaymentOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          payments: [],
          whatCurrUserOwes: [],
          whatCurrUserIsOwed: [],
        };
    }
    componentDidMount(prevProps) {
        this.getPayments();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.groupID !== this.props.groupID) {
            this.getPayments();
        }
    }

    getPayments() {
        let ref = this.props.database.ref('payments/');
        ref.orderByChild("groupID").equalTo(this.props.groupID).on("value", (data) => {
            let payments = [];
            data.forEach((child) => {
                payments.push(child.val());
            });
            this.setState({
                payments: payments,
            })
        });
      }

    render() {

        let whatCurrUserOwes = this.state.payments.filter((item) => {
            if(!item.isComplete && !item.isDeleted)
                return item.payerUID === this.props.user.uid;
            return false;
        });

        let whatCurrUserIsOwed = this.state.payments.filter((item) => {
            if(!item.isComplete && !item.isDeleted) {
                return this.props.personsInGroup.find(person => {
                    return (person.uid === item.payerUID) && (person.uid !== this.props.user.uid)
                });
            }
            return false;
        });

        let totalUserOwes = 0;
        whatCurrUserOwes.forEach(item => totalUserOwes += parseInt(item.amount));

        let owedComponents = whatCurrUserIsOwed.map((payment) => {
            let name = this.props.personsInGroup.find(person => person.uid === payment.payerUID).name;
            return(
              <div
                key={payment.paymentID}
                className="overview-header"
                onClick={() => this.props.handleViewPayments(payment, true)}
              >
                  {name} owes you <b>${payment.amount}</b>
                  <Glyphicon className="pull-right" glyph="menu-right" />
              </div>
            );
        });

        if (!whatCurrUserIsOwed.length & totalUserOwes <= 0)
          owedComponents = (<p>There are currently no payments listed.</p>);

        let overview = (
            <div id="overview">
                <div
                  className="overview-header"
                  onClick={() => this.props.handleViewPayments(whatCurrUserOwes, true)}
                >
                    You owe <b>${totalUserOwes}</b> total
                    <Glyphicon className="pull-right" glyph="menu-right" />
                </div>
            </div>

        );

        return (
            <div className="Payments">
                {(totalUserOwes > 0) ? overview : ""}
                {owedComponents}
            </div>
        )
    }
}
