export const parseQuery = queryString => {
  let query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  pairs.forEach((pairString) => {
    const pair = pairString.split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]) || ''
  });
  return query;
}
