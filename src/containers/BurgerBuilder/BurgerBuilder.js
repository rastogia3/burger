import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import './BurgerBuilder.css'
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { withRouter } from 'react-router-dom'
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false
    }
    componentDidMount() {
        this.props.onInitIngredients();
    }
    // addIngredientHandler = type => {
    //     const updatedCount = this.state.ingredients[type] + 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    //     this.updatePurchasableHandler(updatedIngredients);
    // }
    // removeIngredientHander = type => {
    //     const updatedCount = this.state.ingredients[type] - 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    //     this.updatePurchasableHandler(updatedIngredients);
    // }

    // updatePurchasableHandler = (arr) => {
    //     const sum = Object.keys(arr)
    //         .map(igKey => arr[igKey]).reduce((sum, el) => sum + el, 0)
    //     this.setState({ purchasable: sum > 0 })
    // }
    purchaseHandler = () => {
        if (this.props.token) {
            this.setState({ purchasing: true })
        } else {
            this.props.onsetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }

    }
    removeBackDropHandler = () => {
        this.setState({ purchasing: false, showLoader: false })
    }
    makePurchaseHandler = () => {
        // const queryParams = [];
        // for (let key in this.state.ingredients) {
        //     if (this.state.ingredients[key] > 0) {
        //         queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]))
        //     }
        // }
        // const queryString = queryParams.join('&');
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }


    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let getOrderSummary = <OrderSummary
            ingredients={this.props.ings}
            orderCancel={this.removeBackDropHandler}
            totalPrice={this.props.totalPrice}
            makePurchase={this.makePurchaseHandler}
            isAuth={this.props.token} />;
        if (this.state.showLoader) {
            getOrderSummary = <Spinner show />
        }
        let burgerTemplate = (
            <>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    ingredients={this.props.ings}
                    totalPrice={this.props.totalPrice}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.token}
                />
            </>
        )
        if (!this.props.ings) {
            burgerTemplate = <Spinner show />;
        }
        return (
            <>
                <Modal show={this.state.purchasing} clicked={this.removeBackDropHandler}>
                    {getOrderSummary}
                </Modal>
                {burgerTemplate}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        token: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onsetAuthRedirectPath: (path) => dispatch(actions.afterAuthChecked(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder));
