module.exports.user = {
  id: 'number',
  name: 'string',
  username: 'string',
  email: 'string',
  address: {
    street: 'string',
    suite: 'string',
    city: 'string',
    zipcode: 'string',
    geo: {
      lat: 'string',
      lng: 'string'
    }
  },
  phone: 'string',
  website: 'string',
  company: {
    name: 'string',
    catchPhrase: 'string',
    bs: 'string'
  }
};

module.exports.photo = {
  albumId: 'number',
  id: 'number',
  title: 'string',
  url: 'string',
  thumbnailUrl: 'string'
};

module.exports.album = {
  albumId: 'number',
  id: 'number',
  title: 'string',
  url: 'string',
  thumbnailUrl: 'string'
};