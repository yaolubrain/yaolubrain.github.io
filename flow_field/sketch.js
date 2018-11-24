let img;

function setup() {
  createCanvas(720, 400);
  img = loadImage("starry_night.jpg"); 
}


function draw() {
  background(155);
  image(img, 0, 0);
}
