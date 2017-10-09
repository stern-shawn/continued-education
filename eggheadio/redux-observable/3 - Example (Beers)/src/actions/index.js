export const SEARCHED_BEERS = 'SEARCHED_BEERS';
export const SEARCHED_BEERS_ERROR = 'SEARCHED_BEERS_ERROR';
export const RECEIVED_BEERS = 'RECEIVED_BEERS';

export function searchBeers(query) {
  return {
    type: SEARCHED_BEERS,
    payload: query,
  }
}

export function searchBeersError(err) {
  return {
    type: SEARCHED_BEERS_ERROR,
    payload: err.message,
  }
}

export function receiveBeers(beers) {
  return {
    type: RECEIVED_BEERS,
    payload: beers,
  }
}
