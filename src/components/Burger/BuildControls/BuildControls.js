import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css'
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
]

const BuildControls = props => {
    return (
        <div className="BuildControls p-3">
            <div className="totalPrice">
                <strong> Total Price: ${props.totalPrice.toFixed(2)}</strong>
            </div>

            {controls.map(e => (
                <BuildControl
                    key={e.label}
                    label={e.label}
                    added={() => props.ingredientAdded(e.type)}
                    removed={() => props.ingredientRemoved(e.type)}
                    count={props.ingredients[e.type]}
                    disabled={props.disabled[e.type]} />
            ))}
            <div className="OrderButtonHolder">
                <button
                    className="OrderButton"
                    disabled={props.totalPrice <= 2}
                    onClick={props.ordered}>{props.isAuth?'Order Your Burger':'Sign up for your Order'}</button>
            </div>

        </div>
    )
};
export default BuildControls;

