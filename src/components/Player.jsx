import React, { Component } from "react";
import loadScript from 'load-script';
import FontAwesome from 'react-fontawesome';

import { Footer, PlaybackControls, PlaybackControl } from '../styles';

class Player extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      spotifyPlayerLoaded: false,
      spotifyPlayerCreated: false,
      spotifyPlayerConnected: false,
      playing: false,
    }

    window.onSpotifyPlayerAPIReady = () => {
      this.setState({ spotifyPlayerLoaded: true });
      this.createSpotifyPlayer();
    }
  }

  componentDidMount = () => {
    this.loadSpotifyPlayer();
  }

  checkToken = () => {
    const accessToken = window.localStorage.getItem('access_token');
    if (!accessToken) return;
    this.createSpotifyPlayer();
    window.removeEventListener('storage', this.checkToken);
  }

  loadSpotifyPlayer = () => (new Promise((resolve, reject) => {
    loadScript('https://sdk.scdn.co/spotify-player.js', (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  }).then(script => {
    if (script) console.log('spotify player script loaded');
    else {
      console.error('spotify player script is empty');
      return;
    }
  }).catch(err => {
    console.error('error loading spotify player script');
    console.log(err);
  }));

  createSpotifyPlayer = () => {
    if (typeof window.Spotify === 'undefined') {
      this.setState({ spotifyPlayerLoaded: false });
      return;
    }

    const accessToken = window.localStorage.getItem('access_token');
    if (!accessToken) {
      window.addEventListener('storage', this.checkToken);
      return;
    }

    try {
      window.player = new window.Spotify.Player({
        name: 'Better Spotify :D',
        getOAuthToken: cb => cb(accessToken),
      }); 
    } catch (error) {
      console.error('catched error:');
      console.error(error);
      window.addEventListener('storage', this.checkToken);
      return;
    }
    this.setState({ spotifyPlayerCreated: true });
    this.connectSpotifyPlayer();
  }

  connectSpotifyPlayer = () => {
    if (typeof window.player === 'undefined') {
      this.setState({ spotifyPlayerCreated: false });
      return;
    }
    window.player.on('ready', data => {
      console.log('Ready with Device ID', data.device_id);
      this.setState({ spotifyPlayerConnected: true });
      window.player.on('player_state_changed', this.handleSpotifyPlayerStateChange);
      this.getSpotifyState();
    });

    window.player.connect();
  }

  handleSpotifyPlayerStateChange = state => {
    console.log(state);
  }

  getSpotifyState = () => this.state.spotifyPlayerConnected ? (
    window.player.getCurrentState().then(state => {
      if (state) {
        let { current_track, next_tracks } = state.track_window;

        console.log("Currently Playing", current_track);
        console.log("Playing Next", next_tracks[0]);
      } else {
        console.log("The user is not playing music through the Web Playback SDK");
      }
    })
  ) : null;

  previous = () => {
    console.log('previous');
  }

  togglePlayPause = () => {
    console.log('togglePlayPause');
    this.state.playing ? console.log('already playing') : this.play('spotify:user:basti_3:playlist:4NPzziSpoSEA4dPNnSAsl9');
  }

  next = () => {
    console.log('next');
  }

  play = contextUri => {
    const accessToken = window.localStorage.getItem('access_token');
    const deviceId = window.localStorage.getItem('_spharmony_device_id');
    if (!accessToken || !deviceId) return;

    const uri = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

    fetch(uri, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        context_uri: contextUri,
      }),
    }).then(response => response)
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }

  render = () => {
    const { playing } = this.state;
    const pausePlayIcon = playing ? 'pause' : 'play';

    return (
      <Footer>
        <PlaybackControls>
          <PlaybackControl onClick={this.previous} ><FontAwesome name="step-backward" /></PlaybackControl>
          <PlaybackControl onClick={this.togglePlayPause} ><FontAwesome name={pausePlayIcon} /></PlaybackControl>
          <PlaybackControl onClick={this.next} ><FontAwesome name="step-forward" /></PlaybackControl>
        </PlaybackControls>
      </Footer>
    );
  }
}

export default Player;
