import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { PlaylistWrapper } from '../styles/Playlist';
import Song from './Song';
import { fetchPlaylist } from '../utils/spotify';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    }
  }

  componentDidMount = () => {
    fetchPlaylist('basti_3', '4NPzziSpoSEA4dPNnSAsl9')
      .then(playlist => {
        this.setState({
          items: playlist.items,
        });
      }).catch(err => console.error(err));
  }

  render() {
    const { items } = this.state;
    return (
      <PlaylistWrapper>
        {items.map(({ track, added_at }) =>
          <Song
            key={track.id}
            track={track}
            addedAt={added_at}
            contextUri={'spotify:user:basti_3:playlist:4NPzziSpoSEA4dPNnSAsl9'}
          />
        )}
      </PlaylistWrapper>
    );
  }
}

export default Playlist;
