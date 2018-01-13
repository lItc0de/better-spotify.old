const api = 'https://api.spotify.com/v1';

export const fetchPlaylist = (userId, playlistId) => new Promise((resolve, reject) => {
  const accessToken = window.localStorage.getItem('access_token');
  if (!accessToken) return reject('No Token');

  // GET 	/v1/users/{user_id}/playlists/{playlist_id}/tracks
  fetch([api, 'users', userId, 'playlists', playlistId, 'tracks'].join('/'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default'
  }).then(response => {
    switch (response.status) {
      case 500: return reject('Some server error');
      case 401: return reject('Unauthorized');
      default: break;
    }
    return response.json();
  }).then(json => {
    return resolve(json);
  }).catch(err => {
    return reject(err);
  });
});

export const fetchPlaylists = userId => new Promise((resolve, reject) => {
  const accessToken = window.localStorage.getItem('access_token');
  if (!accessToken) return reject('No Token');

  // GET /v1/users/{user_id}/playlists
  fetch([api, 'users', userId, 'playlists'].join('/'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default'
  }).then(response => {
    switch (response.status) {
      case 500: return reject('Some server error');
      case 401: return reject('Unauthorized');
      default: break;
    }
    return response.json();
  }).then(json => {
    return resolve(json);
  }).catch(err => {
    return reject(err);
  });
});

export const fetchCategories = () => new Promise((resolve, reject) => {
  const accessToken = window.localStorage.getItem('access_token');
  if (!accessToken) return reject('No Token');

  // GET /v1/browse/categories
  fetch([api, 'browse', 'categories'].join('/'), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default'
  }).then(response => {
    switch (response.status) {
      case 500: return reject('Some server error');
      case 401: return reject('Unauthorized');
      default: break;
    }
    return response.json();
  }).then(json => {
    return resolve(json);
  }).catch(err => {
    return reject(err);
  });
});

export const fetchAlbum = uri => {

}

export const fetchTracks = uris => {

}

export const fetchArtist = uri => {

}

export const play = ({ contextUri, uris, offset, deviceId }) => {
  const accessToken = window.localStorage.getItem('access_token');

  const bodyParams = {};
  if (contextUri) bodyParams.context_uri = contextUri;
  if (uris) bodyParams.uris = uris;
  if (offset) bodyParams.offset = { uri: offset };
  const deviceIdOption = deviceId ? `?device_id=${deviceId}` : '';

  if (!accessToken) return;

  const uri = `https://api.spotify.com/v1/me/player/play${deviceIdOption}`;

  fetch(uri, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(bodyParams),
  }).then(response => response)
    .then(json => console.log(json))
    .catch(err => console.error(err));
}
