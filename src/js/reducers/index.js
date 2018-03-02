import { combineReducers } from 'redux'
import fetchedData  from "./fetchedData"
import menu  from "./menu"
const reducers = combineReducers({
	fetchedData,
	menu
})
export default reducers