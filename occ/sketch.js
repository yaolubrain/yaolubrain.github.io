class Square {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 50;
  }

  move() {
    this.x += this.speed;
    this.y += -this.speed;
    return this;
  }

  isInside() {
    return this.x >= 0 & this.x <= displayWidth & this.y >= 0 & this.y <= displayHeight;
  }
}

class Stripe {
  constructor(square_array, speed) {
    this.square_array = square_array;
    this.speed = speed;
  }

  push(square) {
    this.square_array.push(square);
  }

  display() {
    for (let i = this.square_array.length - 1; i >= 0; --i) {
      let square = this.square_array[i];
      fill(0.25*square.y + 1);
      rect(square.x, square.y, square.size, square.size);
    }
    return this;
  }

  move() {
    for (let i = 0; i < this.square_array.length; ++i) {
      let square = this.square_array[i];
      square.x += this.speed;
      square.y += -this.speed;
    }
    return this;
  }

  remove() {
    this.square_array = this.square_array.filter(dot => dot.isInside());
    return this;
  }

  create() {
    console.log(this)
    this.square_array = createSquares(this.square_array, 50);
    return this;
  }
}

let layers = [];

let W = window.innerWidth;
let H = window.innerHeight;

function setup() {
  createCanvas(W, H);

  let flag = 0;
  for (let i = -7/16*W; i < 15/16*W; i+=100) {
    let square_array = [];
    let speed = 2;
    if (flag == 0) {
      speed = 4;
      flag = 1;
    } else {
      flag = 0;
    }
    for (let j = 0; j < 50; ++j) {
      square_array.push(new Square(i+j*30, H-j*30, speed));
    }

    let stripe = new Stripe(square_array, speed);
    layers.push(stripe)
  }
}

function createSquares(squares, num) {
  
  while(squares.length < num) {
    let l = squares.length;
    let i = squares[l-1].x;
    let j = squares[l-1].y;
    let diamond = new Square(i + 30 , j - 30 , 1);
    squares.push(diamond);

    i = squares[0].x;
    j = squares[0].y;
    diamond = new Square(i - 30 , j + 30 , 1);
    squares.unshift(diamond);
  }
  return squares;
}


function draw() {
  background(0);
  noStroke();

  for (let i = 0; i < layers.length; ++i) {
    let stripe = layers[i];
    stripe.display().move().remove().create();
  }
}
