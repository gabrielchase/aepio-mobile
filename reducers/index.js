import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import DeviceReducer from './DeviceReducer'
import ActiveDeviceReducer from './ActiveDeviceReducer'
import CurrentDeviceReducer from './CurrentDeviceReducer'

export default combineReducers({
    auth: AuthReducer,
    devices: DeviceReducer,
    activeDevice: ActiveDeviceReducer,
    currentDevice: CurrentDeviceReducer
})
