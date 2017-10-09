import React from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions';

const Stories = ({ loading, fetchStories, stories }) => {
  if (loading) {
    return <p>Loading, please wait...</p>
  }

  return (
    <div>
      <button type="button" onClick={fetchStories}>Load top 5 stories</button>
      <StoryList stories={stories} />
    </div>
  )
};

const StoryList = ({ stories }) => {
  return (
    <ul>
      {stories.map(story =>
        <li key={story.id}>
          <a href={story.url}>{story.title}</a>
        </li>
      )}
    </ul>
  )
};

const Story = (props) => <p>{props.title}</p>

const mapState = (state) => state;

const mapDispatch = {
  fetchStories,
};

export default connect(mapState, mapDispatch)(Stories);
