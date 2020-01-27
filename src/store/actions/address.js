import * as actionTypes from './actions';

export const profileAddressFetchInit = () => {
    return {
        type: actionTypes.PROFILE_ADDRESS_FETCH_INIT
    }
}

export const profileAddressFetchFail = (error) => {
    return {
        type: actionTypes.PROFILE_ADDRESS_FETCH_FAIL,
        error: error
    }
}

export const profileAddressFetchSuccess = (data) => {
    return {
        type: actionTypes.PROFILE_ADDRESS_FETCH_SUCCESS,
        data: data
    }
}