var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname +'/public'));

/*app.get('/',function (req,res) {
	res.send("hey there fuckers");

});*/

http.listen(3000,function () {
	console.log('listen');
})
console.log(Date.now());
var time = Math.floor((Date.now()+5000)/1000);

io.on('connection',function (socket) {
	console.log('who connected now?? ');
	// io.emit("time","its time")
	
	/*var intervalReg = setInterval(function () {
		io.emit("time", time- Math.floor(Date.now()/1000));
		// time++;
		if (Math.floor(Date.now()/1000)-time >= 0) {
			clearInterval(intervalReg);
		}
	},1000)*/

	function init() {
		setTimeout(function () {
			var diffTime = time- Math.floor(Date.now()/1000);
			io.emit("time", diffTime);
			if (diffTime > 0) {
				init();
			}
		},1000);
	}

	init();

	socket.on('disconnect',function () {
		console.log('damm s/he(*) got disconnected');
	})
})