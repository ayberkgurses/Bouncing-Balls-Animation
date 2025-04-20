balls = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 16; i++){
    balls[i] = new Ball(random(width), random(height), random(25, 60));
  }
}



function draw() {
  background(200);

  for (let i = 0; i < balls.length; i++) {
    balls[i].bounceWalls();

    for (let j = i + 1; j < balls.length; j++) {
      if (balls[i].intersects(balls[j])) {
        balls[i].fixDistance(balls[j]);
        balls[i].fixVelocity(balls[j]);
      }
    }
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
}
