import axios from 'axios'
import { returnErrors } from './errorActions'
import * as actions from './types'


// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: actions.USER_LOADING })

    axios.get('http://localhost:8000/api/users', tokenConfig(getState))
        .then(res => dispatch({
            type: actions.USER_LOADED,
            payload: res.data
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status)),
            dispatch({
                type: actions.AUTH_ERROR
            })
        )
}

// register user
export const register = ({ userName, email, password, confirmPassword }) => dispatch => {
    //header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({ userName, email, password, confirmPassword })
    axios.post('http://localhost:8000/api/signUp', body, config)
        .then(res => 
            dispatch({
                type: actions.REGISTER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: actions.REGISTER_FAIL
            })
        })
}

export const login = ({ email, password }) => dispatch => {
    //header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({ email, password })
    axios.post('http://localhost:8000/api/signIn', body, config)
        .then(res => 
            dispatch({
                type: actions.LOGIN_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: actions.LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return {
        type: actions.LOGOUT_SUCCESS
    }
}

// setup config/header and token

export const tokenConfig = getState => {
    // get token from local storage
    const token = getState().auth.token
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config
}