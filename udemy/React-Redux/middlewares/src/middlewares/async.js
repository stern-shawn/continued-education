export default function({ dispatch }) {
  return next => action => {
    // Log the intercepted action
    console.log(action);

    // Pass it on to the next middleware in the chain (if any)
    // or to the reducers if this is the last middleware
    next(action);
  }
}
