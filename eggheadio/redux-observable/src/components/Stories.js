import React from 'react';
import { connect } from 'react-redux';

const Stories = (props) => {
  return (
    <pre>
      <code>
        {JSON.stringify(props)}
      </code>
    </pre>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Stories);
