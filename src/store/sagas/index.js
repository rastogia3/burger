import { takeEvery } from "redux-saga/effects"
import * as actionTypes from "../actions/actions"
import { fetchOrders, purchaseBurger } from "./orderSagas"
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckState } from "./authSagas";
import { initIngredientsSagas } from './burgerBuilderSagas';
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE, authUserSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INITIATE, fetchOrders);
    yield takeEvery(actionTypes.AUTH_INITIAL_STATE_CHECK, authCheckState);
}
export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSagas);
}
export function* watchBurgerPurchase(){
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurger);
}