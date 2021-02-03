import * as actions from './types'

export const returnErrors = (msg, status, id = null) => {
    return {
        type: actions.GET_ERRORS,
        payload: { msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: actions.CLEAR_ERRORS
    }
}