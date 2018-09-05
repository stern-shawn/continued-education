import autodux from 'autodux';

const signupDuck = autodux({
  slice: 'signup',
  initial: {
    username: '',
    password: '',
    loading: false,
    success: false,
    id: null,
    name: {
      first: 'Shawn',
      last: 'Stern',
    },
  },
  actions: {
    sendSignupInfo: (state, { username, password }) => ({
      ...state,
      username,
      password,
      loading: true,
    }),
    sendPromise: {
      create: ({ username, password }) => ({
        data: { username, password },
        async promise() {
          const data = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
          return data;
        },
      }),
      reducer: (state) => ({
        ...state,
        loading: true,
      }),
    },
    signupSuccess: (state, id) => ({
      ...signupDuck.initial,
      success: true,
      id,
    }),
  },
});

export default signupDuck;
