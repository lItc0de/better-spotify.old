import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SongWrapper, SongMeta, SongButton, SongActions } from '../styles/Song';
import { play } from '../utils/spotify';
import { millisToMinutesAndSeconds } from '../utils/formatNumbers';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    }
  }

  play = () => {
    console.log('play');
    play({ contextUri: this.props.contextUri, offset: this.props.track.uri });
  }

  render = () => {
    const { playing } = this.state;
    const { track, addedAt } = this.props;
    const addedAtMeta = addedAt ? <SongMeta area="addedAt">{ addedAt }</SongMeta> : null;
    const playIcon = playing ? 'pause' : 'play';

    return (
      <SongWrapper>
        <SongButton onClick={this.play} area="pp"><i className={`fa fa-${playIcon}`}></i></SongButton>
        <SongMeta highlight area="title">{track.name}</SongMeta>
        <SongMeta area="artist">{track.artists.map(artist => artist.name).join(', ')}</SongMeta>
        <SongMeta area="genre">DnB</SongMeta>
        {addedAtMeta}
        <SongMeta highlight area="duration">{millisToMinutesAndSeconds(track.duration_ms)}</SongMeta>
        <SongActions>
          <SongButton><i className="fa fa-plus"></i></SongButton>
          <SongButton><i className="fa fa-list"></i></SongButton>
          <SongButton><i className="fa fa-tags"></i></SongButton>
          <SongButton><i className="fa fa-ellipsis-h"></i></SongButton>
        </SongActions>
      </SongWrapper>
    );
  }
}

Song.propTypes = {
  track: PropTypes.object.isRequired,
  addedAt: PropTypes.string,
}

Song.defaultProps = {
  addedAt: null,
}

export default Song;
