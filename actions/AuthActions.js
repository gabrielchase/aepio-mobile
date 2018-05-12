import { Actions } from 'react-native-router-flux'
import axios from 'axios'

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOAD_TRUE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from './types'
import { HOST_URL } from '../const'

let headers = {
    "headers": {
      'Content-Type': 'application/json',
    }
}

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
        dispatch({ type: LOAD_TRUE })
        const url = `${HOST_URL}/login/` 
        try {
            const res = await axios.post(url, {
                email: email,
                password: password
            })
            dispatch({ type: LOGIN_USER_SUCCESS, payload: res })
            Actions.main()
        } catch(err) {
            console.log('Login failed: ', err)
            dispatch({ type: LOGIN_USER_FAIL })
        }
    }
}

export const registerUser = ({ email, password, firstName, lastName, contacts, expo_token }) => {
    return async dispatch => {
        dispatch({ type: LOAD_TRUE })

        let contactsObj = {}
        for (let contact of contacts) {
            let splitContact = contact.split(':')
            let name = splitContact[0]
            let number = splitContact[1]
            contactsObj[name] = number
        }
        
        const newUserInstance = {
            email: email, 
            first_name: firstName, 
            last_name: lastName,
            password: password,
            details: {
                contacts: contactsObj,
                expo_token: expo_token
            }
        }

        try {
            const res = await axios.post(`${HOST_URL}/users/`, JSON.stringify(newUserInstance), headers)
            dispatch({ type: REGISTER_USER_SUCCESS, payload: res })
            Actions.login()
        } catch (err) {
            console.log('Registration failed: ', err)
            dispatch({ type: REGISTER_USER_FAIL })
        }
    }
}
