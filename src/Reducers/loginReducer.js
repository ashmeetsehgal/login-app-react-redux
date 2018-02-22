const defaultLoginState = {
  isUserLoggedIn: false,
  username: '',
  isLuke: false,
};

export default function loginReducer(state = defaultLoginState, action) {
  if (action.type === 'UPDATE_LOGIN_STATUS') {
    return { ...state, ...action.payload };
  }
  return state;
}
