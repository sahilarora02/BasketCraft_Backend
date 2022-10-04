const request = require('request');
var category = 'happiness';
request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
  headers: {
    'X-Api-Key': 'X5L6M8Mv2K/ckVpiveStCA==430u5mJv9JpEbZmp'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});