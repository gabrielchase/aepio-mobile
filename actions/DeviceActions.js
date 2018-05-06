import { Actions } from 'react-native-router-flux'
import axios from 'axios'

import { 
    LOAD_TRUE,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL,
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

export const getUserInfo = (userId, jwt) => {
    return async dispatch => {
        try {
            let newHeaders = getHeaders(jwt)
            const res = await axios.get(`${HOST_URL}/users/${userId}/`, newHeaders)
            dispatch({ type: USER_INFO_SUCCESS, payload: res.data })
        } catch (err) {
            console.log('err: ', err)
            dispatch({ type: USER_INFO_FAIL })
        }
    }
}
