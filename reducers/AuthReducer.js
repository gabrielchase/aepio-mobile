import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from '../actions/types'

const INITIAL_STATE = { 
    email: 'gchase.patron@gmail.com', 
    password: 'password',
    user: null,
    error: ''
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case LOGIN_USER_SUCCESS:
            const { email, token, user_id } = action.payload.data
            return { ...state, user: action.payload.data}
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed'}
        default: 
            return state
    }
}
