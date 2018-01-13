import React, { Component } from 'react';
import { List, ListElement } from '../styles'

import { fetchPlaylists } from '../utils/spotify';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      items: [],
    }
  }

  componentDidMount = () => {
    fetchPlaylists('basti_3')
      .then(playlists => {
        this.setState({
          items: playlists.items,
        });
      }).catch(err => console.error(err));
  }

  render() {
    const { selected, items } = this.state;

    const listElements = items.map(el => (
      <ListElement key={el.id}>{el.name}</ListElement>
    ));

    return (
      <List>
        {listElements}
      </List>
    )
  }
}

export default Playlists;
