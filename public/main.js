$(function () {

	var socket = io();
	socket.on('time',function (msg) {
		$('.time').text(msg);
		console.log(new Date(msg));
	})
});