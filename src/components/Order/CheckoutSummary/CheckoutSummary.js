import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import { Buttons } from '../../Layout/UI/Buttons/Buttons';
const CheckoutSummary = _props => {
    const price = _props.totalPrice>0?_props.totalPrice.toFixed(2):0;
    return (
        <div className='checkOutSummary'>
            <h1>Hope you will like your choice.</h1>
            <Burger ingredients={_props.ingredients}></Burger>
            <p> Total Price $<strong>{price}</strong></p>
            <div className="ButtonGroup">
                <Buttons class="Danger" clicked={_props.checkoutCanlcelled}>Cancel</Buttons>
                <Buttons class="Success" clicked={_props.checkoutContinued}>Continue</Buttons>
            </div>
        </div>
    )
}
export default CheckoutSummary;