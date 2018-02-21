import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import searchReducer from '../Reducers/searchReducer';

const reducer = combineReducers({
  form: reduxFormReducer,
  searchReducer,
});
const store = createStore(reducer);

export default store;
