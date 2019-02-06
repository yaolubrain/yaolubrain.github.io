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
//    translate(this.x2, this.y2);
    //    rotate(-i);
    let ratio = (cos(t) + 1) / 2;
    if (ratio > 0.5) {
      quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
      
    } else {
      noFill();
      strokeWeight(5);
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
//  translate(window.innerWidth/2, window.innerHeight/2);
  for (let i = -20; i < 20; i++) {
    for (let j = -20; j < 20; j++) {

      let n1 = map(noise(i, j), 0, 1, -10, 10);
      let n2 = map(noise(i+5, j+5), 0, 1, -10, 10);
      n1 = 5;
      n2 = 5;
      let x1 = i*80 + n1;
      let y1 = j*80 + n2;
      let x2 = i*80 + 60;
      let y2 = j*80;
      let x3 = i*80 + 60 - n1;
      let y3 = j*80 + 60 - n2;
      let x4 = i*80;
      let y4 = j*80 + 60;
      squares.push(new Square(x1, y1, x2, y2, x3, y3, x4, y4));

    }	
  }  
}

index = 1;

function draw() {
  background(255);
  translate(window.innerWidth/2, window.innerHeight/2);
//  squares.forEach(sq => sq.display());


  for (let i = 0; i < squares.length; ++i) {
    squares[i].move(0.02*index);    
    squares[i].display(0.02*index);

  }

  index++;


  
//  translate(window.innerWidth/2, window.innerHeight/2);


}
