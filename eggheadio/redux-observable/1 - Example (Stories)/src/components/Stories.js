import React from 'react';
import { connect } from 'react-redux';
import { clear, loadStories } from '../actions';

const Stories = (props) => {
  return (
    <div>
      <button type="button" onClick={props.loadStories}>Load Top 2 Stories</button>
      <button type="button" onClick={props.clear}>Clear</button>
      <StoryList {...props} />
    </div>
  );
};

const StoryList = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div>
      {items.map(item => <Story {...item} key={item.id} />)}
    </div>
  )
};

const Story = (props) => <p>{props.title}</p>

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    loadStories: () => dispatch(loadStories()),
    clear: () => dispatch(clear()),
  }
};

export default connect(mapState, mapDispatch)(Stories);
