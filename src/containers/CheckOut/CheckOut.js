

import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { withRouter, Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class CheckOut extends Component {
    checkoutCanlcelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact')
    }

    render() {
        let summary = <Redirect to="/" />;
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        if (this.props.ings) {
            summary = (
                <>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCanlcelled={this.checkoutCanlcelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}
                        totalPrice={this.props.totalPrice}></CheckoutSummary>
                    <Route
                        path={this.props.match.path + '/contact'}
                        component={ContactData} />
                </>
            )
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.orderReducer.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         purchaseInit: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(withRouter(CheckOut));