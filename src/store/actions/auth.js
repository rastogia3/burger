import * as actionTypes from './actions';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}
export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const afterAuthChecked = (path) => {
    return {
        type: actionTypes.AFTER_AUTH_CHECKED,
        path: path
    }
}

export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}
export const auth = (email, password, isSignIn) => {
    return {
        type: actionTypes.AUTH_INITIATE,
        email: email,
        password: password,
        isSignIn: isSignIn
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_INITIAL_STATE_CHECK
    }
}