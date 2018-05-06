import {
    FETCH_DEVICES_SUCCESS,
    FETCH_DEVICES_FAIL
} from '../actions/types'

const INITIAL_STATE = []

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DEVICES_SUCCESS:
            return action.payload
        default: 
            return state
    }
}