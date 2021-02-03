import axios from 'axios'
import * as actions from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getItem = () => dispatch => {
    dispatch(setItemsLoading())
    axios.get('http://localhost:8000/api/Items')
        .then(res => dispatch({
            type: actions.GET_ITEMS,
            payload: res.data
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const addItem = item => (dispatch, getState) => {
    axios.post("http://localhost:8000/api/items", item, tokenConfig(getState))
        .then(res => dispatch({
            type:actions.ADD_ITEMS,
            payload: item
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const deleteItem = id => (dispatch, getState) => {
    axios.delete(`http://localhost:8000/api/items/${id}`, tokenConfig(getState))
        .then(res =>  dispatch({
            type:actions.DELETE_ITEMS,
            payload: id
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const setItemsLoading = item => {
    return {
        type: actions.ITEMS_LOADING,
    }
}