import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link } from 'react-router-dom';

import Playlist from './components/Playlist';
import Playlists from './components/Playlists';
import Login from './components/Login';
import Callback from './components/Callback';
import Player from "./components/Player";

const Home = () => (<Login />);

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/playlist">Playlist</Link></li>
      </ul>

      <hr />

      <Playlists />

      <Route exact path="/" component={Home} />
      <Route path="/playlist" component={Playlist} />
      <Route path="/callback/:app" component={Callback} />

      <Player />
    </div>
  </Router>
);

export default Routes;
