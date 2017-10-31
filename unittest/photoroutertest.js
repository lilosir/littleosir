var fetch = require('node-fetch');

var headers = {
  'x-timestamp': Date.now(),
  'x-sent': true
}

var contents = {
  method: 'GET', 
  headers: headers
};

fetch('http://localhost:3000/images/staysalty.jpg', contents)
.then(function(res) {
	console.log("----->", res)
  // return res.json();
})
.catch(function(err){
  console.log(err);
})