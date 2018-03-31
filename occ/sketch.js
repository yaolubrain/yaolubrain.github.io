class Stick {
  constructor(x1, y1, x2, y2, speed) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.speed = speed;
    this.direct = 1;
  }

  display(W, H) {
    strokeWeight(10);
    line(this.x1, this.y1, this.x2, this.y2);
  }

  move() {

    if (this.x1 == -200) {
      if (Math.abs(this.y1) < 200 && Math.abs(this.y2) < 200) {
        this.y1 += this.direct * this.speed;
        this.y2 -= this.direct * this.speed;
      }

      if (Math.abs(this.y1) >= 200 || Math.abs(this.y2) >= 200) {
        this.direct = -this.direct;
        this.y1 += this.direct * this.speed;
        this.y2 -= this.direct * this.speed;

      }
    }

    if (this.y1 == 200) {
      if (Math.abs(this.x1) < 200 && Math.abs(this.x2) < 200) {
        this.x1 += this.direct * this.speed;
        this.x2 -= this.direct * this.speed;
      }

      if (Math.abs(this.x1) >= 200 || Math.abs(this.x2) >= 200) {
        this.direct = -this.direct;
        this.x1 += this.direct * this.speed;
        this.x2 -= this.direct * this.speed;
      }
    }

  }
}

function compute_intersection(s1, s2) {

  let x1 = s1.x1;
  let y1 = s1.y1;
  let x2 = s1.x2
  let y2 = s1.y2;

  let x3 = s2.x1;
  let y3 = s2.y1;
  let x4 = s2.x2;
  let y4 = s2.y2;

  let x = ((x1*y2-y1*x2)*(x3-x4) - (x3*y4-y3*x4)*(x1-x2)) / ((x1-x2)*(y3-y4) - (x3-x4)*(y1-y2));
  let y = ((x1*y2-y1*x2)*(y3-y4) - (x3*y4-y3*x4)*(y1-y2)) / ((x1-x2)*(y3-y4) - (x3-x4)*(y1-y2));

  return [x, y];
}


let sticks = [];

function setup() {
  let W = window.innerWidth;
  let H = window.innerHeight;
  createCanvas(W, H);
  background(155);

  for (let i = 0; i < 3; ++i) {
    let x1 = random(-200, 200);
    let y1 = 200;
    let x2 = random(-200, 200);
    let y2 = -200;
    let speed = random(-2, 2);
    let stick = new Stick(x1, y1, x2, y2, speed);
    sticks.push(stick);
  }

  for (let i = 0; i < 3; ++i) {
    let x1 = -200;
    let y1 = random(-200, 200);
    let x2 = 200;
    let y2 = random(-200, 200);
    let speed = random(-2, 2);
    let stick = new Stick(x1, y1, x2, y2, speed);
    sticks.push(stick);
  }

}


function draw() {
  background(155);
  let W = window.innerWidth;
  let H = window.innerHeight;

  for (let i = 0; i < sticks.length; ++i) {
    push();
    translate(W/2, H/2);

    sticks[i].display(W, H);
  
    for (let j = i - 1; j >= 0; --j) {
      let p = compute_intersection(sticks[j], sticks[i]);
      if (Math.abs(p[0]) < 200 && Math.abs(p[1]) < 200) {
        fill(0);
        ellipse(p[0], p[1], 15, 15);
      }
    }
    pop();
    

    sticks[i].move();
  }
}
