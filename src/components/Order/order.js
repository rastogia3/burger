import React from 'react'
import './order.css';
export default function order(props) {
    const ingredients = [];
    for (const ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
    }
    const ingredientOutput = ingredients.map(ig => <span style={{ textTransform: 'Capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px' }} key={ig.name}>{ig.name} - {ig.amount}</span>)
    const orderDate = `${new Date(props.orderDate).getMonth() + 1}/${new Date(props.orderDate).getDate()}/${new Date(props.orderDate).getFullYear()} - ${new Date(props.orderDate).getHours()}:${new Date(props.orderDate).getMinutes()}`;

    return (
        <>
            <div className="OrderSummary">
                <div className="ingredients">
                    <p>Ingredients:{ingredientOutput}</p>
                    <p>Total Price: ${props.price.toFixed(2)}</p>
                    <p>Delivery: {props.delivery}</p>
                </div>
                <div>
                    <p>Order Date : {orderDate}</p>
                    <p>Client Name: {props.client.name}</p>
                    <p>Address: {props.client.address1} {props.client.address2}, {props.client.city}</p>
                    <p>Email: {props.client.email}</p>
                </div>
            </div>
        </>
    )
}
