import React, { Component } from 'react'
import { Buttons } from '../../Layout/UI/Buttons/Buttons';
import './OrderSummary.css';
import { withRouter } from "react-router-dom";
class OrderSummary extends Component {
  render() {
    const loginMessage = !this.props.isAuth ? 'Please login before making checkout' : 'Continue to checkout?';
    const ingredientSummary = this.props.ingredients ?

      Object.keys(this.props.ingredients).map(e => {
        return this.props.ingredients[e] > 0 ? <li key={e}><span>{e}</span>:- {this.props.ingredients[e]}</li> : null;
      }) : null;

    return (
      <>
        <h3>Your Order Summary</h3>
        <p>A delicious burger is ready with following ingredients:-</p>
        <ul className="IngredientSummary">
          {ingredientSummary}
        </ul>

        <p>Total Price: <strong>${(this.props.totalPrice).toFixed(2)}</strong></p>
        <p><strong>{loginMessage}</strong></p>
        <div className="checkoutButtonContainer">
          <Buttons class="checkOutButtonCancel" clicked={this.props.orderCancel}>Cancel</Buttons>

          <Buttons class="checkOutButton" clicked={this.props.makePurchase}>CheckOut</Buttons>
        </div>
      </>
    )
  }
}

export default withRouter(OrderSummary)