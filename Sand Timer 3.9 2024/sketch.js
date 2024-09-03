// sand timer!
// p5.play exploration

function setup() {
  createCanvas(500, 500);
  world.gravity.y = 15;

  thehourglass();
  sandparticles();
}

function draw() {
  background("white");
}

function thehourglass(){
   // syntax for drawing a polygon:
  // chain collider line mode || //(x,y, [length0, angle0, length1, ...])
  // kinematic collider type 
  hourglass = new Sprite(
    width / 2,
    height / 2,
    [220, 70, 220, 40, 157, -110, 220, -110, 220, 40, 157, -110],
    "kinematic"
  );
  hourglass.color = "gray";
}

function sandparticles(){
  // sand particles and randomization function to control spawn
  for (let x = 0; x < 200; x++) {
    particles = new Sprite(
      random(width / 2 + 5, width / 2 - 5),
      height / 4,
      5.5
    );
    particles.color = "pink";

    // reduction in friction to promote less stickiness
    particles.friction = 0.00;
  }
}

function mousePressed() {
  // rotate entire hourglass if mouse is pressed
  hourglass.rotate(180, 10);
}
