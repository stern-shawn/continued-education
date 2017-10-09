import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_STORIES, fetchStoriesFulfilled } from '../actions';

const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json`
const url = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`

const fetchStoriesEpic = action$ => 
  action$.ofType(FETCH_STORIES)
    .switchMap(({ payload }) =>
      Observable.ajax.getJSON(topStories)
        // slice the first 5 ids
        .map(ids => ids.slice(0, 5))
        // convert ids -> urls
        .map(ids => ids.map(url))
        // convert urls -> ajax
        .map(urls => urls.map(url => Observable.ajax.getJSON(url)))
        // execute the 5 ajax reqs
        .mergeMap(reqs => Observable.forkJoin(reqs))
        // results -> store
        .map(stories => fetchStoriesFulfilled(stories)) 
    );

export const rootEpic = combineEpics(
  fetchStoriesEpic,
);
