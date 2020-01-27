import * as actions from '../actions/actions';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    profile: null,
    addresses: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PROFILE_ADDRESS_FETCH_INIT: return updateObject(state, { loading: true })
        case actions.PROFILE_ADDRESS_FETCH_SUCCESS: return updateObject(state, { loading: false, addresses: action })
        case actions.PROFILE_ADDRESS_FETCH_FAIL: return updateObject(state, { loading: false, error: action })
        default: return state
    }
}

export default reducer;