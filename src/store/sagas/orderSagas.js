import { put } from 'redux-saga/effects';
import * as actions from "../actions/index"
import axios from "../../axios-order";


export function* fetchOrders(action) {
    yield put(actions.fetchOrderInit());

    const token = action.token;
    const userId = action.userId;
    const queryParams = `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    try {
        const res = yield axios.get(queryParams);
        const fetchDataFromServer = [];
        for (const key in res.data) {
            fetchDataFromServer.push({ ...res.data[key], id: key })
        }
        yield put(actions.fetchOrderSuccess(fetchDataFromServer))
    } catch (error) {
        yield put(actions.fetchOrderFail(error.response.data.error))
    }
}

export function* purchaseBurger(action) {
    yield put(actions.purchaseBurgerStart());
    const token = action.token;
    const orderData = action.orderData;

    const queryform = `/orders.json?auth=${token}`;
    try {
        const res = axios.post(queryform, orderData);
        yield put(actions.purchaseBurgerSuccess(res.data, orderData))
    } catch (error) {
        console.log(error)
    }

}
