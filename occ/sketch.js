class Square {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 100;
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
    this.square_array = createSquares(this.square_array, 50);
    return this;
  }
}

let layers = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let x = -800; x < 2000; x+=400) {
    let square_array = [];
    let speed = (Math.random() ) * 5;
    for (let i = 0; i < 50; ++i) {
      square_array.push(new Square(x+i*30, window.innerHeight-i*30, speed));
    }

    let stripe = new Stripe(square_array, speed);
    layers.push(stripe)
  }
}

function createSquares(diamonds, num) {
  
  while(diamonds.length < num) {
    let l = diamonds.length;
    let x = diamonds[l-1].x;
    let y = diamonds[l-1].y;
    let diamond = new Square(x + 30 , y - 30 , 1);
    diamonds.push(diamond);

    x = diamonds[0].x;
    y = diamonds[0].y;
    diamond = new Square(x - 30 , y + 30 , 1);
    diamonds.unshift(diamond);
  }
  return diamonds;
}


function draw() {
  background(0);
  noStroke();

  for (let i = 0; i < layers.length; ++i) {
    let stripe = layers[i];
    stripe.display().move().remove().create();
  }
}
