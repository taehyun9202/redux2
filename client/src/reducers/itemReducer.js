import * as actions from '../actions/types'

const initialState = {
    items: [],
    loading: false
}


export default function(state = initialState, action ) {
    switch(action.type) {
        case actions.GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case actions.DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case actions.ADD_ITEMS:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case actions.ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}