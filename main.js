var express = require('express');
var path = require('path');
var request = require('request');
var url = "http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words";

var app = express();
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/words', function(req, res){
	request(url, function (error, response, body) {
	// for options, use:  request(url + '?count=' + req.query.count, function (error, response, body) {	
  		if (!error && response.statusCode == 200) {
    		body = body.split("\n");
    		res.send(JSON.stringify(body));
  		}
	})
})

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
})

