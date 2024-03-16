import { applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { teacherLoginReducer } from './reducers/teacherReducers';
import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({
  teacherLogin: teacherLoginReducer
});

const userInfoFromStorage = localStorage.getItem('teacherInfo')
  ? JSON.parse(localStorage.getItem('teacherInfo'))
  : null;

const initialState = {
  teacherLogin: { teacherInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
