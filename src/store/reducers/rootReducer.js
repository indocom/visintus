import authReducer from './authReducer'
import planReducer from './planReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    plan: planReducer
})

export default rootReducer