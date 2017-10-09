export const FETCH_STORIES = 'FETCH_STORIES';
export const FETCH_STORIES_FULFILLED = 'FETCH_STORIES_FULFILLED';

export function fetchStories(count = 5) {
  return {
    type: FETCH_STORIES,
    payload: count,
  }
}

export function fetchStoriesFulfilled(stories) {
  return {
    type: FETCH_STORIES_FULFILLED,
    payload: stories,
  }
}
