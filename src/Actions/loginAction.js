export const loginAction = payload => ({
  type: 'UPDATE_LOGIN_STATUS',
  payload,
});

export const loginErrorAction = payload => ({
  type: 'UPDATE_ERROR_STATUS',
  payload,
});

