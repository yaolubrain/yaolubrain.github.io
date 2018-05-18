
class Cube {
  constructor(x, y, len_x, len_y) {
    this.l = x;
    this.r = x + len_x;
    this.u = y;
    this.d = y + len_y;
    this.len_x = len_x;
    this.len_y = len_y;
    this.speed_x = random(-5,5);
    this.speed_y = random(-5,5);
  }

  display(c) {
    fill(c);
    rect(this.l, this.u, this.len_x, this.len_y);

    return this;
  }

  display_edge() {
    noFill();
    rect(this.l, this.u, this.len_x, this.len_y);

    return this;
  }

  move() {
    this.l += this.speed_x;
    this.r += this.speed_x;
    this.u += this.speed_y;
    this.d += this.speed_y;
  
    return this;


  }

}

function intersect(c1, c2) {

  let l = Math.max(c1.l, c2.l); 
  let r = Math.min(c1.r, c2.r); 
  let u = Math.max(c1.u, c2.u); 
  let d = Math.min(c1.d, c2.d); 

  if (l < r && u < d) {
    return new Cube(l, u, r - l, d - u);
  } else {
    return;
  }
}

let cubes = [];

function setup() {
  let W = window.innerWidth;
  let H = window.innerHeight;
  let S = Math.min(W, H);
  createCanvas(W, H);
  background(255);

  let n = 20;

  strokeWeight(5);
  for (let i = 0; i < n; ++i) {
    let x = random(W/2 - 500, W/2 + 200);
    let y = random(H/2 - 400, H/2 + 200);
    let len = random(100, 300);

    cubes.push(new Cube(x, y, len, len));
  }


}

function draw() {

  background(255);

  for (let i = 0; i < cubes.length; ++i) {
    for (let j = i+1; j < cubes.length; ++j) {
      let region = intersect(cubes[i], cubes[j]);
      if (region) {
        region.display(100);
      }
    }
  }

  for (let i = 0; i < cubes.length; ++i) {
    cubes[i].display_edge().move();
  }



}
