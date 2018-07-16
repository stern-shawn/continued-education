import { combineEpics } from 'redux-observable';
import { sendSignupInfoEpic } from '../features/Signup/Signup.epics';

const rootEpic = combineEpics(
  sendSignupInfoEpic
);

export default rootEpic;
