class Stick {
  constructor(x1, y1, x2, y2, speed) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.speed = speed;
    this.direct = 1;
  }

  display(S) {
    strokeWeight(S/80);
    line(this.x1, this.y1, this.x2, this.y2);
  }

  move(S) {
    if (this.x1 == -0.3*S) {
      if (Math.abs(this.y1) < 0.3*S && Math.abs(this.y2) < 0.3*S) {
        this.y1 += this.direct * this.speed;
        this.y2 -= this.direct * this.speed;
      }

      if (Math.abs(this.y1) >= 0.3*S || Math.abs(this.y2) >= 0.3*S) {
        this.direct = -this.direct;
        this.y1 += this.direct * this.speed;
        this.y2 -= this.direct * this.speed;

      }
    }

    if (this.y1 == 0.3*S) {
      if (Math.abs(this.x1) < 0.3*S && Math.abs(this.x2) < 0.3*S) {
        this.x1 += this.direct * this.speed;
        this.x2 -= this.direct * this.speed;
      }

      if (Math.abs(this.x1) >= 0.3*S || Math.abs(this.x2) >= 0.3*S) {
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
  let S = Math.min(W, H);
  createCanvas(W, H);
  background(155);

  for (let i = 0; i < 3; ++i) {
    let x1 = random(-0.3*S, 0.3*S);
    let y1 = 0.3*S;
    let x2 = random(-0.3*S, 0.3*S);
    let y2 = -0.3*S;
    let speed = random(-2, 2);
    let stick = new Stick(x1, y1, x2, y2, speed);
    sticks.push(stick);
  }

  for (let i = 0; i < 3; ++i) {
    let x1 = -0.3*S;
    let y1 = random(-0.3*S, 0.3*S);
    let x2 = 0.3*S;
    let y2 = random(-0.3*S, 0.3*S);
    let speed = random(-2, 2);
    let stick = new Stick(x1, y1, x2, y2, speed);
    sticks.push(stick);
  }

}


function draw() {
  background(155);
  let W = window.innerWidth;
  let H = window.innerHeight;
  let S = Math.min(W, H);
  push();
  translate(W/2, H/2);

  strokeWeight(S/80);
  line(-0.3*S, -0.3*S, -0.3*S, 0.3*S);
  line(-0.3*S, -0.3*S, 0.3*S, -0.3*S);
  line(0.3*S, 0.3*S, -0.3*S, 0.3*S);
  line(0.3*S, 0.3*S, 0.3*S, -0.3*S);

  for (let i = 0; i < sticks.length; ++i) {
    sticks[i].display(S);
    for (let j = i - 1; j >= 0; --j) {
      let p = compute_intersection(sticks[j], sticks[i]);
      if (Math.abs(p[0]) < 0.3*S && Math.abs(p[1]) < 0.3*S) {
        fill(0);
        ellipse(p[0], p[1], S/50, S/50);
      }
    }
    sticks[i].move(S);
  }

  pop();
}
