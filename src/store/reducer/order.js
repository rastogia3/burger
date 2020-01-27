import * as actions from '../actions/actions';
import { updateObject } from '../../shared/utility';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const updateBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    }
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}
const fetchBurgerSuccess = (state,action)=>{
    return updateObject(state, {
        loading: false,
        orders: action.orders
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_INIT: return updateObject(state, { purchased: false });
        case actions.PURCHASE_BURGER_START: return updateObject(state, { loading: true })
        case actions.PURCHASE_BURGER_SUCCESS: return updateBurgerSuccess(state, action);
        case actions.PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false })
        case actions.FETCH_ORDERS_INIT: return updateObject(state, { loading: true })
        case actions.FETCH_ORDERS_SUCCESS: return fetchBurgerSuccess(state,action);
        case actions.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });
        default: return state;
    }
}

export default reducer;