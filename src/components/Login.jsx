import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { popupCenter } from '../utils/popup';

const scopes = encodeURIComponent([
  'playlist-read-private',
  'streaming',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
].join(' '))

const url = `https://accounts.spotify.com/de/authorize?client_id=${process.env['REACT_APP_SPOTIFY_CLIENT_ID']}&response_type=code&redirect_uri=${encodeURIComponent('http://localhost:3000/callback/spotify')}&state=123&scope=${scopes}`

// const url = `https://accounts.spotify.com/de/authorize?client_id=5c4aeb1c4e8f495fa3ba5e13916eb3f4&response_type=token&redirect_uri=localhost%3A3000&scope=streaming%20user-read-birthdate%20user-read-email%20user-read-private`

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount = () => this.checkToken();

  checkToken = () => {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) this.setState({ loggedIn: true });
    window.removeEventListener('storage', this.checkToken);
  }

  clickHandler = () => {
    popupCenter(url, 'Login to Spotify', 400, 600);

    window.addEventListener('storage', this.checkToken);
  };

  render = () => (this.state.loggedIn ? <p>Already logged in</p> : <button onClick={this.clickHandler}>Login</button>);
}

export default Login;
