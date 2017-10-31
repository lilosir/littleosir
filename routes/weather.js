var express = require('express');
var router = express.Router();
var apiai = require('apiai');
var app = apiai("1439d8d1ff654084af8265fcfa6de923");

/* post to weather. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	var text = req.body.text;

  var dialogFlowRequest = app.textRequest(text, {
    sessionId: '123123123'
	});

	dialogFlowRequest.on('response', function(response) {
    console.log('response: ', response);

	  res.send('weather request~~' + JSON.stringify(response));
	});

	dialogFlowRequest.on('error', function(error) {
	    console.log('error: ', error);
	    res.send('error: ' + error);
	});

	dialogFlowRequest.end();

});

module.exports = router;
