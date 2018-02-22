const defaultLoginState = {
  isUserLoggedIn: false,
  username: '',
  isLuke: false,
  hasError: null,
};

export default function loginReducer(state = defaultLoginState, action) {
  if (action.type === 'UPDATE_LOGIN_STATUS') {
    return { ...state, ...action.payload };
  } else if (action.type === 'UPDATE_ERROR_STATUS') {
    return { ...state, ...action.payload };
  }
  return state;
}
