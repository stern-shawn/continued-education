import autodux from 'autodux';

const signupDuck = autodux({
  slice: 'signup',
  initial: {
    username: '',
    password: '',
    loading: false,
    success: false,
    id: null,
  },
  actions: {
    sendSignupInfo: (state, { username, password }) => ({
      ...state,
      username,
      password,
      loading: true,
    }),
    signupSuccess: (state, id) => ({
      ...signupDuck.initial,
      success: true,
      id,
    }),
  },
});

export default signupDuck;
