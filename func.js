//config

var background_color = "lightblue";
var mask_color = "green";
var maskhead_color = "black";
var spawn_color = "yellow";
var conf_Time = 100;

//global variable
var head_x = 0;
var head_y = 0;

var time = conf_Time;
var direction = "";
var points = 0;

var mask = [];

var spawn_x = 0;
var spawn_y = 0;
var gotIt = false;

function init(){
	var b_canvas = document.getElementById("holder");
	var b_context = b_canvas.getContext("2d");

	b_context.fillStyle = background_color;
	b_context.fillRect(0, 0, 700, 700);

	b_context.fillStyle = maskhead_color;
	head_x = randomInt(1, 34) * 20;
	head_y = randomInt(1, 34) * 20;

	mask.push([head_x, head_y]);

	b_context.fillRect(head_x, head_y, 20, 20);
	spawnShit();
}

function randomInt(min, max){
	return parseInt((Math.random() * (max - min + 1)), 10) + min;
}

function isin(test, base){
	for (var i = 0; i < base.length; i++){
		if(test[0] == base[i][0] && test[1] == base[i][1]){
			return true;
		}
	}
	return false;
}

function spawnShit(){
	while (true){
		spawn_x = randomInt(1, 34) * 20;
		spawn_y = randomInt(1, 34) * 20;

		if(isin([spawn_x, spawn_y], mask)){
			continue;
		}

		var b_canvas = document.getElementById("holder");
		var b_context = b_canvas.getContext("2d");

		b_context.fillStyle = spawn_color;
		b_context.fillRect(spawn_x, spawn_y, 20, 20);

		break;
	}
}

function headToBody(){
	var b_canvas = document.getElementById("holder");
	var b_context = b_canvas.getContext("2d");

	b_context.fillStyle = mask_color;
	b_context.fillRect(head_x, head_y, 20, 20);
}

function move(){
	
	var b_canvas = document.getElementById("holder");
	var b_context = b_canvas.getContext("2d");

	switch(direction){
		case "left":
			headToBody();
			head_x = head_x - 20;
			if (head_x < 0){
				head_x = 680;
			}
			break;
		case "right":
			headToBody();
			head_x = head_x + 20;
			if (head_x > 680){
				head_x = 0;
			}
			break;
		case "up":
			headToBody();
			head_y = head_y - 20;
			if (head_y < 0){
				head_y = 680;
			}
			break;
		case "down":
			headToBody();
			head_y = head_y + 20;
			if (head_y > 680){
				head_y = 0;
			}
			break;
		default:
			call_move();
			return false;
	}

	if (head_x == spawn_x && head_y == spawn_y){ //got one
		gotOne();
	}

	if (isin([head_x, head_y], mask)){
		gameover();
	}

	mask.push([head_x, head_y]);
	b_context.fillStyle = maskhead_color;
	b_context.fillRect(head_x, head_y, 20, 20);

	if (gotIt){
		gotIt = false;
	} else if(mask.length > 1){
		b_context.fillStyle = background_color;
		b_context.fillRect(mask[0][0], mask[0][1], 20, 20);
		mask.shift();
	}

	call_move();
}

function pressed(e) {
	switch(e.keyCode) {
		case 37:
			if (direction == "right"){
				break;
			}
			direction = "left";
			break;
		case 38:
			if (direction == "down"){
				break;
			}
			direction = "up";
			break;
		case 39:
			if (direction == "left"){
				break;
			}
			direction = "right";
			break;
		case 40:
			if (direction == "up"){
				break;
			}
			direction = "down";
			break;
	}   
}

function call_move(){
	setTimeout(function(){move()}, time);
}

function gotOne(){
	points += 1;
	gotIt = true;
	spawnShit();
	if (time > 1){
		time -= 1;
	}
}

function gameover(){
	alert("You ate yourself.\nPoints: "+points);
	direction = "";
	points = 0;
	mask = [];
	gotIt = false;
	time = conf_Time;
	init();
}