class Diamond {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }

  display() {
    fill(this.c);
    push();
//    rotate(PI / 4);
    rect(this.x, this.y, 100, 100);
    pop();
    return this;
  }

  rebirth() {
    if (this.x < -200) {
      this.x = displayWidth + this.x + 200;
    } else if (this.x > displayWidth) {
      this.x = this.x - displayWidth;
    }

    if (this.y < -200) {
      this.y = displayHeight + this.y + 200;
    } else if (this.y > displayHeight) {
      this.y = this.y - displayHeight;
    }
    return this;
  }

}

let points = [];
let layers = [];

function drawLine(p1, p2) {
  stroke(0);
  line(p1.x_proj, p1.y_proj, p2.x_proj, p2.y_proj);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < 20; ++i) {
    let diamonds = [];
    for (let x = 0; x < displayWidth; x+=400) {
      for (let y = 0; y < displayHeight; y+=400) {
        diamonds.push(new Diamond(x+i*30, y+i*30, (i+2)*10));
      }
    }

    layers.push(diamonds)
  }
}


function draw() {
  background(0);
//  translate(width/2, height/2);
  noStroke();

  for (let i = 0; i < layers.length; ++i) {
    let diamonds = layers[i];
    for (let j = 0; j < diamonds.length; j++) {
      diamonds[j].x += -(i + 1)/2;
      diamonds[j].y += -(i + 1)/2;
      diamonds[j].rebirth();
      diamonds[j].display();
    }
  }

}
