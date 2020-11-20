import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { weatherReducer } from './Reducer'

const reducers = combineReducers({
  weather: weatherReducer,
})
export const store = createStore(reducers, applyMiddleware(thunk))
