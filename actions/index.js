import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from './types'
import { HOST_URL } from '../const'

import axios from 'axios'

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return async dispatch => {
        const url = `${HOST_URL}/login/` 
        try {
            const res = await axios.post(url, {
                email: email,
                password: password
            })
            dispatch({ type: LOGIN_USER_SUCCESS, payload: res })
        } catch(err) {
            dispatch({ type: LOGIN_USER_FAIL })
        }
    }
}
