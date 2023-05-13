import { legacy_createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import authReducer from "./reducers/auth.reducer"
const root = combineReducers({
    auth: authReducer
})

export const store = legacy_createStore(root, applyMiddleware(thunk))