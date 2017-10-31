var apiai = require('apiai');

var app = apiai("1439d8d1ff654084af8265fcfa6de923");

var request = app.textRequest('what is the weather in toronto?', {
    sessionId: '123123123'
});

request.on('response', function(response) {
    console.log('response: ', response);
});

request.on('error', function(error) {
    console.log('error: ', error);
});

request.end();