import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { delay, map, pluck, switchMap, tap } from 'rxjs/operators';

import signupDuck from './Signup.duck';

const { sendSignupInfo, signupSuccess } = signupDuck.actions;

export const sendSignupInfoEpic = action$ => action$.pipe(
  ofType(sendSignupInfo.type),
  delay(3000),
  switchMap(({ username, password }) =>
    ajax({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      username,
      password,
    }).pipe(
      tap(res => console.log('Response: ', res)),
      pluck('response', 'id'),
      map(signupSuccess)
    )
  )
);
