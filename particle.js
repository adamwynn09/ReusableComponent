var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
var dred = 64
var dgreen = 255
var dblue = 255

class Particle{
	constructor(x,y,m,r,g,b,o){
		this.positionX = x || mouseX;
		this.positionY = y || mouseY;
		this.mass = m || random(0.003, 0.03);
		this.red = r||dred;
		this.green = g||dgreen;
		this.blue = b ||dblue;
		this.opacity = o||192;
	}
	
	setRed(red){
		dred = red;
	}
	
	setGreen(green){
		dgreen = green;
	}
	
	setBlue(blue){
		dblue = blue;
	}
	

	
	addNewParticle(){
		mass.push(this.mass);
		positionX.push(this.positionX);
	    positionY.push(this.positionY);
	    velocityX.push(0);
     	velocityY.push(0);
     	
	}		
	draw(){
		fill(this.red, this.green, this.blue, this.opacity);
		noStroke();

		for (var particleA = 0; particleA < mass.length; particleA++) {
		var accelerationX = 0, accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				var force = (distance - 320) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
	}
	
	for (var particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
		positionY[particle] += velocityY[particle];
		ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
	}
	}
	
}
