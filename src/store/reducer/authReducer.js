import * as actions from '../actions/actions';
import { updateObject } from '../../shared/utility'
const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirect: '/'
}

const authStart = state => updateObject(state, { error: null, loading: true });
const authSuccess = (state, action) => updateObject(state, { error: null, loading: false, token: action.idToken, userId: action.userId });
const authFail = (state, action) => updateObject(state, { error: action.error, loading: false })
const authLogout = state => updateObject(state, { error: null, loading: false, token: null, userId: null })
const authRedirect = (state, action) => updateObject(state, { authRedirect: action.path })


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START: return authStart(state);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_FAIL: return authFail(state, action)
        case actions.AUTH_LOGOUT: return authLogout(state)
        case actions.AFTER_AUTH_CHECKED: return authRedirect(state, action)
        default: return state;
    }
}

export default authReducer;