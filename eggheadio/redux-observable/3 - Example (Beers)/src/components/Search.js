import React from 'react';

const Search = ({ defaultValue, messages, onChange }) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search for a beer"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />
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
