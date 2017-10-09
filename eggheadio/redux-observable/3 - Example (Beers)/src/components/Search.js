import React from 'react';

const Search = ({ defaultValue, onChange }) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search for a beer"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
