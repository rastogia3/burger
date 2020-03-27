import { takeEvery, all, takeLatest } from "redux-saga/effects"
import * as actionTypes from "../actions/actions"
import { fetchOrders, purchaseBurger } from "./orderSagas"
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckState } from "./authSagas";
import { initIngredientsSagas } from './burgerBuilderSagas';
export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE, authUserSaga),
        takeEvery(actionTypes.FETCH_ORDERS_INITIATE, fetchOrders),
        takeEvery(actionTypes.AUTH_INITIAL_STATE_CHECK, authCheckState)
    ])
}
export function* watchBurgerBuilder() {
    yield takeLatest(actionTypes.INIT_INGREDIENTS, initIngredientsSagas);
}
export function* watchBurgerPurchase() {
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurger);
}