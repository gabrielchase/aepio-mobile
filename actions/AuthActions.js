import { Actions } from 'react-native-router-flux'
import axios from 'axios'

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
} from './types'
import { HOST_URL } from '../const'

const HEADERS = {
    "headers": {
      'Content-Type': 'application/json',
    }
}

function getHeaders(jwt) {
    let newHeaders = Object.assign({}, HEADERS)
    newHeaders['headers']['Authorization'] = `JWT ${jwt}`
    return newHeaders
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
            const res = await axios.post(`${HOST_URL}/users/`, JSON.stringify(newUserInstance), HEADERS)
            dispatch({ type: REGISTER_USER_SUCCESS, payload: res })
            Actions.login()
        } catch (err) {
            console.log('Registration failed: ', err)
            dispatch({ type: REGISTER_USER_FAIL })
        }
    }
}

export const getUserInfo = (user_id, token) => {
    return async dispatch => {
        const url = `${HOST_URL}/users/${user_id}/` 
        try {
            const res = await axios.get(url, getHeaders(token))
            dispatch({ type: GET_USER_INFO, payload: res.data})
        } catch(err) {
            console.log('Getting user info failed: ', err)
        }   
    }
}

export const updateUser = (email, password, firstName, lastName, contacts, expo_token, user_id, token) => {
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
            const res = await axios.put(`${HOST_URL}/users/${user_id}/`, JSON.stringify(newUserInstance), getHeaders(token))
            dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
            Actions.main()
        } catch (err) {
            console.log('User update failed: ', err)
        }
    }
}

export const updateUserFail = () => {
    return dispatch => {
        dispatch({ type: UPDATE_USER_FAIL })
    }
}   
