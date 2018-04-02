
class point {
  constructor(x, y, speed, s) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.s = s;
  }

  move() {

//   ellipse(-this.s, -this.s, 50, 50);

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
    strokeWeight(S/80);
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
  background(155);

  let n = 5;
  let d = 0.1;

  for (let i = 0; i < n; ++i) {
    let x1 = d*i*S + (0.30-(n-1)*d)*S;
    let y1 = 0.3*S;
    let x2 = d*i*S - 0.30*S;
    let y2 = -0.3*S;
    let speed = 2;
    let stick = new Stick(x1, y1, x2, y2, speed, 0.3*S);
    sticks.push(stick);
  }

  for (let i = 0; i < 5; ++i) {
    let x1 = -0.3*S;
    let y1 = d*i*S + (0.30-(n-1)*d)*S;
    let x2 = 0.3*S;
    let y2 = d*i*S - 0.30*S;
    let speed = 2.5;
    let stick = new Stick(x1, y1, x2, y2, speed, 0.3*S);
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
      if (Math.abs(p[0]) < 0.29*S && Math.abs(p[1]) < 0.29*S) {
        fill(0);
        ellipse(p[0], p[1], S/50, S/50);
      }
    }
    sticks[i].move(S);
  }

  pop();
}
