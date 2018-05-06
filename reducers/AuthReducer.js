import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS
} from '../actions/types'

const INITIAL_STATE = { 
    email: 'gchase.patron@gmail.com', 
    password: 'password',
    user: null
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
        default: 
            return state
    }
}
