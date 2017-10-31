var express = require('express');
var router = express.Router();

router.get('/:filename', function(req, res, next) {

	var { filename } = req.params;

	var options = {
    root: __dirname + '/public/images',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = __dirname + '/public/images/' + filename;
  console.log(fileName)

	res.sendFile(fileName, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
})

module.exports = router;