import React, { Component } from 'react';

import { parseQuery } from '../utils/uriFunctions';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { match, location } = this.props;
    const query = parseQuery(location.search);
    fetch(`/callback/${match.params.app}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({code: query.code}),
    }).then(response => response.json())
      .then(json => {
        window.localStorage.setItem('access_token', json.access_token);
        window.close();
      });
  }

  render = () => {

    return (
      <h1>successfully logged in</h1>
    )
  }
}

export default Callback;
