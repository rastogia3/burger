import React from 'react'
import './Burger.css';
import {withRouter} from 'react-router-dom';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => (
                <BurgerIngredients type={igKey} key={igKey + i}></BurgerIngredients>
            ))
        }).reduce((arr, el) => arr.concat(el), []);
    if (props.ingredients && transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients to Burger...</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default withRouter(burger);