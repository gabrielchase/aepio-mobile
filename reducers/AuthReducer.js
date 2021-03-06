import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOAD_TRUE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    GET_USER_INFO,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL 
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
        case LOAD_TRUE:
            return { ...state, loading: true, error: '' }
        case LOGIN_USER_SUCCESS:
            const { email, token, user_id } = action.payload.data
            console.log(`Login succeeded with ${email}\nUser id: ${user_id}`)
            return { ...state, ...INITIAL_STATE, user: action.payload.data }
        case LOGIN_USER_FAIL:
            console.log('Authentication failed')
            return { ...state, error: 'Authentication Failed', loading: false }
        case REGISTER_USER_SUCCESS:
            console.log('Successfuly registered: ', action.payload.data)
            return { ...state, loading: false}
        case REGISTER_USER_FAIL: 
            return { ...state, error: 'Registration Failed', loading: false }
        case GET_USER_INFO:
            return { ...state, user_info: action.payload }
        case UPDATE_USER_SUCCESS:
            return { ...state, user_info: action.payload, loading: false }
        case UPDATE_USER_FAIL:
            return { ...state, error: 'Update Failed. Make sure to fill out all fields', loading: false }
        default: 
            return state
    }
}
