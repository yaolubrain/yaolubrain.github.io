class point {
  constructor(x, y, speed, s) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.s = s;
  }

  move() {

    if (this.x == -this.s && this.y == -this.s) {
      if (this.speed > 0) {
        this.x += this.speed;
      } else {
        this.y -= this.speed;
      }
      return this;
    }

    if (this.x == this.s && this.y == -this.s) {
      if (this.speed > 0) {
        this.y += this.speed;
      } else {
        this.x += this.speed;
      }
      return this;
    }

    if (this.x == -this.s && this.y == this.s) {
      if (this.speed > 0) {
        this.y -= this.speed;
      } else {
        this.x -= this.speed;
      }
      return this;
    }

    if (this.x == this.s && this.y == this.s) {
      if (this.speed > 0) {
        this.x -= this.speed;
      } else {
        this.y += this.speed;
      }
      return this;
    }



    if (this.x == -this.s) {
        this.y -= this.speed;
    } else if (this.x == this.s) {
        this.y += this.speed;
    } else if (this.y == -this.s) {
        this.x += this.speed;
    } else if (this.y == this.s) {
        this.x -= this.speed;
    }

    this.x = Math.min(this.x, this.s);
    this.x = Math.max(this.x, -this.s);
    this.y = Math.min(this.y, this.s);
    this.y = Math.max(this.y, -this.s);

  }
}

class Stick {
  constructor(x1, y1, x2, y2, speed, size) {
    this.p1 = new point(x1, y1, speed, size);
    this.p2 = new point(x2, y2, speed, size);
  }

  display(S) {
    strokeWeight(S);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    return this;
  }

  move(S) {
    this.p1.move();
    this.p2.move();
  }
}



function compute_intersection(s1, s2) {

  let x1 = s1.p1.x;
  let y1 = s1.p1.y;
  let x2 = s1.p2.x;
  let y2 = s1.p2.y;

  let x3 = s2.p1.x;
  let y3 = s2.p1.y;
  let x4 = s2.p2.x;
  let y4 = s2.p2.y;

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
  background(255);

  let n = 3;
  let d = 0.1;

  for (let i = 0; i < n; ++i) {
    let x1 = (random() - 0.5) * 1.0 * S;
    let y1 = 0.5*S;
    let x2 = (random() - 0.5) * 1.0 * S;
    let y2 = -0.5*S;
    let speed = (random() * 5 + 0.5) * 0.7;
    let stick = new Stick(x1, y1, x2, y2, speed, 0.5*S);
    sticks.push(stick);
  }

  for (let i = 0; i < n; ++i) {
    let x1 = -0.5*S;
    let y1 = (random() - 0.5) * 1.0 * S;
    let x2 = 0.5*S;
    let y2 = (random() - 0.5) * 1.0 * S;
    let speed = (random() * 8 + 0.8) * 0.7;
    let stick = new Stick(x1, y1, x2, y2, speed, 0.5*S);
    sticks.push(stick);
  }

}


function draw() {
  background(255);
  let W = window.innerWidth;
  let H = window.innerHeight;
  let S = Math.min(W, H);

  push();
  translate(W/2, H/2);

  strokeWeight(S/40);
  line(-0.3*S, -0.3*S, -0.3*S, 0.3*S);
  line(-0.3*S, -0.3*S, 0.3*S, -0.3*S);
  line(0.3*S, 0.3*S, -0.3*S, 0.3*S);
  line(0.3*S, 0.3*S, 0.3*S, -0.3*S);

  strokeWeight(100);
  for (let i = 0; i < sticks.length; ++i) {
    sticks[i].display(S/12);
  }
  pop();

  push();
  translate(W/2, H/2);
  for (let i = 0; i < sticks.length; ++i) {
    stroke(255);
    sticks[i].display(S/20);
    sticks[i].move(0.5*S);
  }
  pop();

  push()
  noStroke();
  fill(255);
  rect(0, 0, W, H/2-0.3*S);
  rect(0, H/2 + 0.3*S, W, H);
  rect(0, 0, W/2-0.3*S, H);
  rect(W/2 + 0.3*S, 0, W/2-0.3*S, H);
  pop();
}
