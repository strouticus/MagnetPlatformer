var canvas = document.getElementById('Canvas2D');
var ctx = canvas.getContext('2d');

var wKey;
var aKey;
var sKey;
var dKey;

var PLAYER_ACCEL = 0.8;
var PLAYER_MAX_YVEL = 15;
var PLAYER_JUMP_ACCEL = 15;

var GRAVITY = 0.7;

var GROUND_FRICTION = 0.85;


function Init () {
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();
	requestAnimFrame(Update);
}

var player = {
	x: 0,
	y: 0,
	width: 30,
	height: 60,
	xVel: 0,
	yVel: 0
}

function UpdatePlayer () {
	//Input
	if (dKey)
	{
		player.xVel += PLAYER_ACCEL;
	}
	if (aKey)
	{
		player.xVel -= PLAYER_ACCEL;
	}
	if (IsGrounded() && wKey)
	{
		player.yVel -= PLAYER_JUMP_ACCEL;
	}

	//Cap y Velocity
	if (player.yVel > PLAYER_MAX_YVEL)
	{
		player.yVel = PLAYER_MAX_YVEL;
	}

	//Check Grounded
	if (IsGrounded())
	{
		player.y = canvas.height - player.height;
		player.yVel = Math.min(0, player.yVel);
	}

	//Move
	player.x += player.xVel;
	player.y += player.yVel;

	//Friction
	player.xVel *= GROUND_FRICTION;

	//Gravity
	player.yVel += GRAVITY;

}

function IsGrounded () {
	if (player.y > canvas.height - player.height)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function DrawPlayer () {
	ctx.fillRect(player.x, player.y, player.width, player.height);
}

function Update () {
	UpdatePlayer();
	Render();
	requestAnimFrame(Update);
}

function Render () {
	ClearScreen();

	DrawPlayer();	
}

function ClearScreen () {
	canvas.width = canvas.width;
}

function MousePos (e) {

}

function HoverOn (e) {

}

function HoverOff (e) {

}

window.addEventListener('keypress', DoKeyPress, true);
window.addEventListener('keydown', DoKeyDown, true);
window.addEventListener('keyup', DoKeyUp, true);

// Character input function
function DoKeyPress (e) {
	//nothing
}

// Key Down event:
// Does key input (sets booleans to true)
// Prevents Back key from going back a page
function DoKeyDown (e) {
	if (e.keyCode === 8)
	{
		//Backspace - prevent going back a page
		e.preventDefault();
	}
	else if (e.keyCode === 87)
	{
		wKey = true;
	}
	else if (e.keyCode === 65)
	{
		aKey = true;
	}
	else if (e.keyCode === 83)
	{
		sKey = true;
	}
	else if (e.keyCode === 68)
	{
		dKey = true;
	}
	
	//console.log(e.keyCode);
}

// Key Up event:
// Does key input (sets booleans to false)
function DoKeyUp (e) {
	if (e.keyCode === 87)
	{
		wKey = false;
	}
	else if (e.keyCode === 65)
	{
		aKey = false;
	}
	else if (e.keyCode === 83)
	{
		sKey = false;
	}
	else if (e.keyCode === 68)
	{
		dKey = false;
	}
}

