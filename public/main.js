$(function () {

	var socket = io();
	socket.on('time',function (msg) {
		/*$('.time').html(
"<span>"+msg.day+" day </span>"+
"<span>"+msg.hrs+" hrs </span>"+
"<span>"+msg.min+" min </span>"+
"<span>"+msg.sec+" sec </span>");
	*/
	if (msg.day !== 0) {
		$('.time .day').text(msg.day+" day(s)");
	}

	if (msg.hrs !== 0 && msg.day !== 0) {
		$('.time .hours').text(msg.hrs+" : ");
	}

	$('.time .minute').text(msg.min+" : ");
	$('.time .second').text(msg.sec+" ");
	})
});
