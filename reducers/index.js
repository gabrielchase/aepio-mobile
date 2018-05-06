import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import UserInfoReducer from './UserInfoReducer'

export default combineReducers({
    auth: AuthReducer,
    userInfo: UserInfoReducer
})
