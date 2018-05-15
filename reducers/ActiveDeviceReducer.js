import {
    MAKE_ACTIVE_DEVICE,
    FETCH_DEVICE_FAIL
} from '../actions/types'

const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case MAKE_ACTIVE_DEVICE:
            return action.payload
        default: 
            return state
    }
}