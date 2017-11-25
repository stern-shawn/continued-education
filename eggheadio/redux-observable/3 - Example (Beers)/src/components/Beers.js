import React from 'react';

const Beers = ({ beers, loading }) =>
  <div className="beers-list">
    <h3>Search Results: ({beers.length}) {loading && 'Loading...'}</h3>
    {beers.length > 0 && (
      <ul>
        {beers.map(beer => (
          <li key={beer.id} className="beer">
            <figure className="beerImg"><img src={beer.image_url} alt=""/></figure>
            <p>{beer.name} <small>{beer.tagline}</small></p>
          </li>
        ))}
      </ul>
    )}
  </div>

export default Beers;
