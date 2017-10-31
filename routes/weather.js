var express = require('express');
var router = express.Router();
var apiai = require('apiai');
var app = apiai("1439d8d1ff654084af8265fcfa6de923");
var YQL = require('yql');

/* post to weather. */
router.post('/', function(req, res, next) {
	
	var { text, place } = req.body;
	var result = {
		speech: "",
		displayText: "",
		data: {},
		contextOut: [],
		source: ""
	};

  var dialogFlowRequest = app.textRequest(text, {
    sessionId: '123123123'
	});

	dialogFlowRequest.on('response', function(response) {
    console.log('response: ', response);

		var queryGeo = new YQL(`select * from geo.places where text="${place}"`);
		queryGeo.exec(function (error, geolocation) {
			// Do something with results (response.query.results)
			// console.log(geolocation.query.results.place[0].woeid);
			var woeid = geolocation.query.results.place[0].woeid;
			var queryWeather = new YQL(`select item.condition from weather.forecast where woeid=${woeid} and u='c'`);
			queryWeather.exec(function (error, weathers) {
				if(error) {
					res.status(500).send('error: ' + error);
				}
				console.log(weathers.query.results.channel.item.condition);
				var { date, temp, text } = weathers.query.results.channel.item.condition;
				result.speech = `In ${place}, it will be ${temp}, ${text}, ${date}`;
				result.displayText = `In ${place}, it will be ${temp}, ${text}, ${date}`;
				result.contextOut = [{"name":"weather", "lifespan":2, "parameters":{"geo-city":place, "date": date}}]

		    res.set({'Content-type': 'application/json'});
			  res.send(result);
			});
		});
	});

	dialogFlowRequest.on('error', function(error) {
	    console.log('error: ', error);
	    res.status(500).send('error: ' + error);
	});

	dialogFlowRequest.end();

});

module.exports = router;
