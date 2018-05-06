import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types'

const INITIAL_STATE = { 
    email: 'gchase.patron@gmail.com', 
    password: 'password',
    user: null,
    error: '',
    loading: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case LOGIN_USER:
            return { ...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            const { email, token, user_id } = action.payload.data
            console.log(`Login succeeded with ${email}\nUser id: ${user_id}`)
            return { ...state, ...INITIAL_STATE, user: action.payload.data }
        case LOGIN_USER_FAIL:
            console.log('Authentication failed')
            return { ...state, error: 'Authentication Failed', loading: false }
        default: 
            return state
    }
}
