import React from 'react';

const Search = ({ cancel, defaultValue, loading, messages, onChange }) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search for a beer"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />
      {loading && (
        <button type="button" onClick={cancel}>Cancel</button>
      )}
      {messages.length > 0 && (
        <ul>
          {messages.map(message =>
            <li key={message.text} className={`Message ${message.type}`}>
              {message.text}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
