import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import DeviceReducer from './DeviceReducer'
import CurrentDeviceReducer from './CurrentDeviceReducer'

export default combineReducers({
    auth: AuthReducer,
    devices: DeviceReducer,
    currentDevice: CurrentDeviceReducer
})
