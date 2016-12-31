var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var time;

app.use(express.static(__dirname +'/public'));

app.get('/updatetime/:hrs/:min',function (req,res) {
	// if (typeof req.param2 === 'undefined') {
	// 	param2 = 0;
	// }

	// console.log(req.params.param1);
	time = Math.floor((Date.now())/1000)+parseInt(req.params.hrs)*60*60+parseInt(req.params.min)*60;
	res.send("yo");

});

http.listen(3000,function () {
	console.log('listen');
})
console.log(Date.now());

time = Math.floor((Date.now()+15000)/1000);

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

	

	init();

	socket.on('disconnect',function () {
		console.log('damm s/he(*) got disconnected');
	})
})

function init() {
	setTimeout(function () {
		var diffTime = time- Math.floor(Date.now()/1000);
		tmObj = timehs(diffTime);
		console.log(tmObj);
		io.emit("time", tmObj);
		if (diffTime > 0) {
			init();
		}
	},1000);
}

function timehs(time) {
	var sec =0,min=0,hrs=0,day=0
	sec = time;
	if (sec > 59) {
		min = Math.floor(sec/60);
		sec = sec - min*60;
	}

	if (min > 59) {
		hrs = Math.floor(min/60);
		min = min - hrs*60;
		// sec = sec - min*60;	
	}

	if (hrs > 23) {
		day = Math.floor(hrs/24);
		hrs = hrs - day*24;
	}

	return {day : day,
		hrs : hrs,
		min : min,
		sec : sec
	}
}