class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  project() {
    this.x_proj = 150*this.x / this.z;
    this.y_proj = 150*this.y / this.z;
    return this;
  }

  display() {
    fill(0);
//    ellipse(this.x_proj, this.y_proj, 50/this.z, 50/this.z);
    ellipse(this.x_proj, this.y_proj, 0.1*this.z, 0.1*this.z);
    return this;
  }

  rotateR() {
    let theta = radians(2);
    let x_old = this.x;
    let z_old = this.z;
    this.x =  0 + cos(theta)*x_old - sin(theta)*(z_old - 20);
    this.z = 20 + sin(theta)*x_old + cos(theta)*(z_old - 20);
    return this;
  }

  rotateL() {
    let theta = -radians(2);
    let x_old = this.x;
    let z_old = this.z;
    this.x =  0 + cos(theta)*x_old - sin(theta)*(z_old - 20);
    this.z = 20 + sin(theta)*x_old + cos(theta)*(z_old - 20);
    return this;
  }
 
}

let points_1 = [];
let points_2 = [];

function drawLine(p1, p2) {
  stroke(0);
  line(p1.x_proj, p1.y_proj, p2.x_proj, p2.y_proj);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  points_1.push(new Point(-10, -10, 10));
  points_1.push(new Point( 10, -10, 10));
  points_1.push(new Point( 10,  10, 10));
  points_1.push(new Point(-10,  10, 10));
  points_1.push(new Point(-10, -10, 30));
  points_1.push(new Point( 10, -10, 30));
  points_1.push(new Point( 10,  10, 30));
  points_1.push(new Point(-10,  10, 30));

  points_2.push(new Point(-5, -5, 15));
  points_2.push(new Point( 5, -5, 15));
  points_2.push(new Point( 5,  5, 15));
  points_2.push(new Point(-5,  5, 15));
  points_2.push(new Point(-5, -5, 25));
  points_2.push(new Point( 5, -5, 25));
  points_2.push(new Point( 5,  5, 25));
  points_2.push(new Point(-5,  5, 25));

}


function draw() {
  background(255);
  translate(window.innerWidth/2, window.innerHeight/2);

  points_1.forEach(p => p.rotateL().project().display());
  points_2.forEach(p => p.rotateR().project().display());

  drawLine(points_1[0], points_1[1]);
  drawLine(points_1[1], points_1[2]);
  drawLine(points_1[2], points_1[3]);
  drawLine(points_1[3], points_1[0]);
  drawLine(points_1[4], points_1[5]);
  drawLine(points_1[5], points_1[6]);
  drawLine(points_1[6], points_1[7]);
  drawLine(points_1[7], points_1[4]);
  drawLine(points_1[0], points_1[4]);
  drawLine(points_1[1], points_1[5]);
  drawLine(points_1[2], points_1[6]);
  drawLine(points_1[3], points_1[7]);

  drawLine(points_2[0], points_2[1]);
  drawLine(points_2[1], points_2[2]);
  drawLine(points_2[2], points_2[3]);
  drawLine(points_2[3], points_2[0]);
  drawLine(points_2[4], points_2[5]);
  drawLine(points_2[5], points_2[6]);
  drawLine(points_2[6], points_2[7]);
  drawLine(points_2[7], points_2[4]);
  drawLine(points_2[0], points_2[4]);
  drawLine(points_2[1], points_2[5]);
  drawLine(points_2[2], points_2[6]);
  drawLine(points_2[3], points_2[7]);

}
