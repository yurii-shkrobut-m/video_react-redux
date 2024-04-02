// npm i redux @types/redux
import { combineReducers, legacy_createStore as createStore } from 'redux';
import amountReducer from '../features/amount';

const reducer = combineReducers({
  amount: amountReducer,
});

const store = createStore(reducer);

export default store;
