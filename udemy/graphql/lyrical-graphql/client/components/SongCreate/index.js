import React, { Component } from 'react';

class SongCreate extends Component {
  state = {
    title: '',
  }

  handleChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        <form>
          <label>Song Title:</label>
          <input onChange={this.handleChange} value={this.state.title} />
        </form>
      </div>
    );
  }
}

export default SongCreate;
