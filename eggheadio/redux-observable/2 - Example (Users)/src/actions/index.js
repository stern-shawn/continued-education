export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

export function fetchUser(login) {
  return {
    type: FETCH_USER,
    payload: login,
  }
}

export function fetchUserFulfilled(user) {
  return {
    type: FETCH_USER_FULFILLED,
    payload: user,
  }
}
