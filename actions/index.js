import { Actions } from 'react-native-router-flux'
import axios from 'axios'

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types'
import { HOST_URL } from '../const'


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
        dispatch({ type: LOGIN_USER })
        const url = `${HOST_URL}/login/` 
        try {
            const res = await axios.post(url, {
                email: email,
                password: password
            })
            dispatch({ type: LOGIN_USER_SUCCESS, payload: res })
            Actions.deviceList()
        } catch(err) {
            dispatch({ type: LOGIN_USER_FAIL })
        }
    }
}
