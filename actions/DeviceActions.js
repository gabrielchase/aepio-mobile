import { Actions } from 'react-native-router-flux'
import axios from 'axios'

import { 
    LOAD_TRUE,
    FETCH_DEVICES_SUCCESS,
    FETCH_DEVICES_FAIL,
    FETCH_DEVICE_SUCCESS,
    FETCH_DEVICE_FAIL,
    MAKE_ACTIVE_DEVICE
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

export const fetchDevices = (userId, jwt) => {
    return async dispatch => {
        try {
            let newHeaders = getHeaders(jwt)
            const res = await axios.get(`${HOST_URL}/users/${userId}/`, newHeaders)
            dispatch({ type: FETCH_DEVICES_SUCCESS, payload: res.data.devices })
            dispatch({ type: MAKE_ACTIVE_DEVICE, payload: res.data.devices[0] })
        } catch (err) {
            console.log('err: ', err)
            dispatch({ type: FETCH_DEVICES_FAIL })
        }
    }
}

export const fetchDevice = (deviceId, jwt) => {
    return async dispatch => {
        try {
            let newHeaders = getHeaders(jwt)
            const res = await axios.get(`${HOST_URL}/devices/${deviceId}/`, newHeaders)
            dispatch({ type: FETCH_DEVICE_SUCCESS, payload: res.data })
        } catch (err) {
            console.log('err: ', err)
            dispatch({ type: FETCH_DEVICE_FAIL })
        }
    }
}

export const makeActiveDevice = (device) => {
    return async dispatch => {
        dispatch({ type: MAKE_ACTIVE_DEVICE, payload: device})
    }
}
