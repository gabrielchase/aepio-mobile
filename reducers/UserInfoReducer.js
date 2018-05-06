import {
    USER_INFO_SUCCESS,
    USER_INFO_FAIL
} from '../actions/types'

const INITIAL_STATE = []

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_INFO_SUCCESS:
            console.log(action.payload)
            return action.payload
        default: 
            return state
    }
}