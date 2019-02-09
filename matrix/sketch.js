class Square {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;

    this.x1_ori = x1;
    this.y1_ori = y1;
    this.x3_ori = x3;
    this.y3_ori = y3;    
  }

  display(t) {

    push();
//    translate((this.x1+this.x3)/2, (this.y1+this.y3)/2);
    
    translate(window.innerWidth/2, window.innerHeight/2);
    rotate(0.1*t);

    let ratio = (cos(t) + 1) / 2;
    if (ratio > 0.5) {
      quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);      
    } else {
      noFill();
      strokeWeight(2);
      quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
    }
    
    pop();
  }

  move(t) {
    let ratio = (cos(t) + 1) / 2;
    this.x1 = ratio*this.x1_ori + (1-ratio)*this.x3_ori;
    this.y1 = ratio*this.y1_ori + (1-ratio)*this.y3_ori;
    this.x3 = (1-ratio)*this.x1_ori + ratio*this.x3_ori;
    this.y3 = (1-ratio)*this.y1_ori + ratio*this.y3_ori;
  }
}

let squares = [];


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  let w1 = window.innerWidth / 60;
  let w2 = w1 + 5;

  for (let i = -10; i < 10; i++) {
    for (let j = -10; j < 10; j++) {
      let n1 = 5;
      let n2 = 5;

      let x1 = i*w1 + n1;
      let y1 = j*w1 + n2;
      let x2 = i*w1 + w2;
      let y2 = j*w1;
      let x3 = i*w1 + w2 - n1;
      let y3 = j*w1 + w2 - n2;
      let x4 = i*w1;
      let y4 = j*w1 + w2;
      
      if (i % 2 == 0) {      
	squares.push(new Square(x1, y1, x2, y2, x3, y3, x4, y4));
      } else {
	squares.push(new Square(x3, y3, x2, y2, x1, y1, x4, y4));
      }

    }	
  }  
}

let t = 1;

function draw() {
  background(255);

  for (let i = -10; i < 10; i++) {
    for (let j = -10; j < 10; j++) {
      let index = (i+10) * 20 + j + 10;
      squares[index].move(1*cos(0.01*t) * 0.05*(i-j) * (i+j));
      squares[index].display(1*cos(0.01*t) * 0.05*(i-j) * (i+j));
    }
  }

  t++;
}
