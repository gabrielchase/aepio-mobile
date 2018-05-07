import {
    FETCH_DEVICE_SUCCESS,
    FETCH_DEVICE_FAIL
} from '../actions/types'

const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DEVICE_SUCCESS:
            return action.payload
        default: 
            return state
    }
}