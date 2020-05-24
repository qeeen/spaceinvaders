var pbox;//collision box for the player

var bullets;//array for all the bullets on the screen
var enemies;//array for all the enemies on screen

var enemy_timer;//timer variable to keep track of which direction to move them in
var move_period;//how many frames it takes for one round of moving back and forth for enemies

function setup(){
	createCanvas(1024, 640, WEBGL);
	background(0);

	//note that all collision boxes are arrays formatted as [x, y, width, height]
	pbox = [0, 0, 50, 50];
	bullets = [];
	init_enemies();
	move_period = 1024;
	enemy_timer = -move_period;
}

function draw(){
	background(0);

	bullet_loop();
	enemy_loop();
	player_loop();
}

//collision checking function
//first checks if the x value of either box is in the range of the other box
//if that is true, then it checks if the y value of either box is in the other box
function collides(box1, box2){
	if(box1[0] >= box2[0] && box1[0] <= box2[0]+box2[2]){
		if(box1[1] >= box2[1] && box1[1] <= box2[1]+box2[3]){
			return true;
		}
		if(box2[1] >= box1[1] && box2[1] <= box1[1]+box1[3]){
			return true;
		}
	}
	if(box2[0] >= box1[0] && box2[0] <= box1[0]+box1[2]){
		if(box1[1] >= box2[1] && box1[1] <= box2[1]+box2[3]){
			return true;
		}
		if(box2[1] >= box1[1] && box2[1] <= box1[1]+box1[3]){
			return true;
		}
	}
	return false;
}

//controls
function mousePressed(){
	if(mouseButton === LEFT){
		bullets.push(new bullet([pbox[0], pbox[1], 20, 20], 3*PI/2, 10));
	}
}

//struct for bullet data
function bullet(colbox, dir, speed){
	this.colbox = colbox;
	this.dir = dir;
	this.speed = speed;
	this.tag = "bullet";
}

//struct for enemy data
function enemy(colbox, health){
	this.colbox = colbox;
	this.health = health;
	this.tag = "enemy";
}

//code that runs each frame for each bullet currently on screen
function bullet_loop(){
	for(let i = 0; i < bullets.length; i++){
		//go through each bullet and transform it/check for collision
		cbul = bullets[i];
		cbul.colbox[0] += cos(cbul.dir)*cbul.speed;
		cbul.colbox[1] += sin(cbul.dir)*cbul.speed;

		push();
		translate(cbul.colbox[0], cbul.colbox[1], 80);
		box(cbul.colbox[2], cbul.colbox[3], 20);
		pop();

		//delete offscreen bullets and hit bullets 
		for(let k = 0; k < enemies.length; k++){
			let enemybox = enemies[k].colbox;
			if(collides(cbul.colbox, enemybox)){
				bullets.splice(i, 1);
				enemies.splice(k, 1);
				i--;
				break;
			}
		}
		if(cbul.colbox[1] < -height/2){
			bullets.splice(i, 1);
			i--;
		}
	}
}

//code that runs each frame for each enemy on screen
function enemy_loop(){
	for(let i = 0; i < enemies.length; i++){
		//enemy translation
		cenem = enemies[i];
		
		let spd = 1;
		enemy_timer++;
		if(enemy_timer < 0)
			cenem.colbox[0] += spd;
		else if(enemy_timer >= 0 && enemy_timer < move_period)
			cenem.colbox[0] -= spd;
		else if(enemy_timer >= move_period)
			enemy_timer = -move_period;

		cenem.colbox[1] += 0.2;

		push();
		translate(cenem.colbox[0], cenem.colbox[1], 80);
		box(cenem.colbox[2], cenem.colbox[3], 50);
		pop();
	}
}

//creates the initial wave of enemies
function init_enemies(){
	enemies = [];
	for(let i = 0; i < 4; i++){
		for(let k = 0; k < 3; k++){
			enemies[i+k*4] = new enemy([i*160 - width/4, k*80 - height/3, 50, 50], 2);
		}
	}
	console.log(enemies);
}

//code to run each frame for the player
function player_loop(){
	//player translation
	push();
	fill(0, 0, 255);
	pbox[0] = mouseX-width/2;
	pbox[1] = 200;//mouseY-height/2;

	translate(pbox[0], pbox[1], 80);
	box(pbox[2], pbox[3], 50);
	pop();
}




