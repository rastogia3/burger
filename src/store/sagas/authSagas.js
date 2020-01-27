import { put, delay } from 'redux-saga/effects';
import * as actions from "../actions/index"
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('userToken');
    yield localStorage.removeItem('userLocalId');
    yield localStorage.removeItem('userExpirationTime');
    yield localStorage.removeItem('userEmail');
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const body = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let newLocal = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaZXmibiBHgyonH7gmrqxgtpXan9kyztM';
    if (action.isSignIn) {
        newLocal = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaZXmibiBHgyonH7gmrqxgtpXan9kyztM'
    }

    try {
        const res = yield axios.post(newLocal, body);
        const expirationTime = new Date(new Date()).getTime() + res.data.expiresIn * 1000;
        localStorage.setItem('userToken', res.data.idToken)
        localStorage.setItem('userLocalId', res.data.localId)
        localStorage.setItem('userEmail', action.email)
        localStorage.setItem('userExpirationTime', expirationTime)
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn * 1000));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error.message))
    }

}

export function* authCheckState() {
    const token = yield localStorage.getItem('userToken');
    const userExpirationTime = yield localStorage.getItem('userExpirationTime');
    const userId = yield localStorage.getItem('userLocalId')
    if (!token) {
        yield put(actions.logout());
    } else {
        if (userExpirationTime < new Date().getTime()) {
            yield put(actions.logout());
        } else {
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout(userExpirationTime - (new Date().getTime())))
        }
    }
}