import * as actionTypes from './actions';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
})

export const purchaseBurgerFail = error => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
})

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START,
})

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
})

export const fetchOrderInit = () => ({
    type: actionTypes.FETCH_ORDERS_INIT,
})

export const fetchOrderSuccess = orders => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
})

export const fetchOrderFail = error => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
})

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS_INITIATE,
        token: token,
        userId: userId
    }
}

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT,
        orderData: orderData,
        token: token
    }
}
