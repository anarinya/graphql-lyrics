import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { fetchSongById } from '../queries';
import { LyricCreate, LyricList } from './';

class SongDetail extends Component {
  render() {
    const { loading, song } = this.props.data;
    const { id } = this.props.params;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{ song.title }</h3>
        <LyricList lyrics={ song.lyrics } />
        <LyricCreate songId={ id } />
      </div>
    );
  }
}

export default graphql(fetchSongById, {
  options: (props) => { 
    return { 
      variables: { id: props.params.id }
    }
  }
})(SongDetail);