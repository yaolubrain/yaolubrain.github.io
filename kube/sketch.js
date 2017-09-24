class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  project() {
    this.x_proj = 50*this.x / this.z;
    this.y_proj = 50*this.y / this.z;
    return this;
  }

  display() {
    fill(0);
    ellipse(this.x_proj, this.y_proj, 100/this.z, 100/this.z);
    return this;
  }

  rotate() {
    let theta = radians(2);
    let x_old = this.x;
    let z_old = this.z;
    this.x =  0 + cos(theta)*x_old - sin(theta)*(z_old - 20);
    this.z = 20 + sin(theta)*x_old + cos(theta)*(z_old - 20);
    return this;
  }
}

let points = [];

function drawLine(p1, p2) {
  stroke(0);
  line(p1.x_proj, p1.y_proj, p2.x_proj, p2.y_proj);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  points.push(new Point(-10, -10, 10));
  points.push(new Point( 10, -10, 10));
  points.push(new Point( 10,  10, 10));
  points.push(new Point(-10,  10, 10));
  points.push(new Point(-10, -10, 30));
  points.push(new Point( 10, -10, 30));
  points.push(new Point( 10,  10, 30));
  points.push(new Point(-10,  10, 30));
}


function draw() {
  background(255);
  translate(width/2, height/2);

  points.forEach(p => p.rotate().project().display());

  drawLine(points[0], points[1]);
  drawLine(points[1], points[2]);
  drawLine(points[2], points[3]);
  drawLine(points[3], points[0]);
  drawLine(points[4], points[5]);
  drawLine(points[5], points[6]);
  drawLine(points[6], points[7]);
  drawLine(points[7], points[4]);
  drawLine(points[0], points[4]);
  drawLine(points[1], points[5]);
  drawLine(points[2], points[6]);
  drawLine(points[3], points[7]);
}
