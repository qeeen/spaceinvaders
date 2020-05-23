var flybox;
var pbox;
var bullets;

function setup(){
	createCanvas(1024, 640, WEBGL);
	background(0);

	flybox = [0, 0, 50, 50];
	pbox = [0, 0, 50, 50];
	bullets = [];
}

function draw(){
	background(0);

	//go through each bullet and transform it/check for collision
	for(let i = 0; i < bullets.length; i++){
		cbul = bullets[i];
		cbul.colbox[0] += cos(cbul.dir)*cbul.speed;
		cbul.colbox[1] += sin(cbul.dir)*cbul.speed;

		if(collides(cbul.colbox, flybox))
			fill(0, 255, 0);
		else
			fill(255, 0, 0);
		push();
		translate(cbul.colbox[0], cbul.colbox[1], 80);
		box(cbul.colbox[2], cbul.colbox[3], 20);
		pop();
	}
	//create the bullets
	if(frameCount%40 == 0){
		bullets.push(new bullet([pbox[0], pbox[1], 20, 20], 3*PI/2, 10));
	}

	//enemy translation
	push();
		let speed = 18;
		let range = 100;
		flybox[0] = cos(frameCount/speed)*range*2;
		flybox[1] = sin(frameCount/speed)*range/2 - 100;

		translate(flybox[0], flybox[1], 80);
		box(flybox[2], flybox[3], 50);
	pop();

	//player translation
	push();
		fill(0, 0, 255);
		pbox[0] = mouseX-width/2;
		pbox[1] = 200;//mouseY-height/2;

		translate(pbox[0], pbox[1], 80);
		box(pbox[2], pbox[3], 50);
	pop();
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

//struct for bullet data
function bullet(colbox, dir, speed){
	this.colbox = colbox;
	this.dir = dir;
	this.speed = speed;
}








