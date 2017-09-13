import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.mutate({
      variables: { 
        songId: this.props.songId,
        content: this.state.content 
      }
    });

    this.setState({ content: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add a Lyric</label>
        <input 
          value={this.state.content}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const mutation = gql`
mutation AddLyricToSong($songId: ID, $content: String) {
  addLyricToSong(songId: $songId, content: $content) {
    id
    lyrics {
      id
      content
      likes
    }
  }
}
`;

export default graphql(mutation)(LyricCreate);