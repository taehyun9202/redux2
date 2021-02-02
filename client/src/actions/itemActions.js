import axios from 'axios'
import * as actions from './types'

export const getItem = () => dispatch => {
    dispatch(setItemsLoading())
    axios.get('http://localhost:8000/api/Items')
         .then(res => dispatch({
             type: actions.GET_ITEMS,
             payload: res.data
         }))
         .catch(err => console.log(err))
}

export const addItem = item => dispatch => {
    axios.post('http://localhost:8000/api/Items', item)
    .then(res => ( 
        dispatch({
            type: actions.ADD_ITEMS,
            payload: res.data
        }),
        console.log(res.data)
    ))
}

export const deleteItem = id => {
    return {
        type: actions.DELETE_ITEMS,
        payload: id
    }
}

export const setItemsLoading = item => {
    return {
        type: actions.ITEMS_LOADING,
    }
}