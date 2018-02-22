import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import searchReducer from '../Reducers/searchReducer';
import loginReducer from '../Reducers/loginReducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  searchReducer,
  loginReducer,
});
const store = createStore(rootReducer);

export default store;
