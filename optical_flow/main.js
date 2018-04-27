"use strict";

let dots = [];
let dotNum = 500;
let dotSizeMin = 5;
let dotSizeMax = 50;

let center = { 
    x: 0, 
    y: 0,
    setToMouse() {
        this.x = mouseX;
        this.y = mouseY;
    }
};


class Dot {
    constructor(x, y, dotSize) {
        this.x = x;
        this.y = y;
        this.dotSize = dotSize;
    }

    display() {
        ellipse(this.x, this.y, this.dotSize, this.dotSize);
        return this;
    }

    moveTo(dot) {
        this.x += 0.0005 * this.dotSize * (this.x - dot.x);
        this.y += 0.0005 * this.dotSize * (this.y - dot.y);
        return this;
    }


    rotate(degree, dot) {
        this.x = dot.x + cos(degree) * (this.x - dot.x) - sin(degree) * (this.y - dot.y);
        this.y = dot.y + sin(degree) * (this.x - dot.x) + cos(degree) * (this.y - dot.y);
        return this;
    }


    expand() {
        this.dotSize *= 1.03;
        return this;
    }        

    isInside() {
        let W = window.innerWidth;
        let H = window.innerHeight;

        return this.x >= 0 & this.x <= W & this.y >= 0 & this.y <= H;
    }
};

function createDots(dots, dotNum, dotSizeMean, scale) {
    let W = window.innerWidth;
    let H = window.innerHeight;

    for (let i = 0; i < dotNum; i++) {
        let x = random() * W;
        let y = random() * H;
        let dotSize = dotSizeMean * (1 + scale*(random() - 0.5));
        let dot = new Dot(x, y, dotSize);
        dots.push(dot);
    }
}


function setup() {

    randomSeed(0);
    let W = window.innerWidth;
    let H = window.innerHeight;

    createCanvas(W, H);

    createDots(dots, dotNum, 4, 1);

    noStroke();
    fill(0, 0, 0);

}


function draw() {

    background(255);
    
    center.setToMouse();

    dots.forEach(dot => dot.display().moveTo(center).expand());

    dots = dots.filter(dot => dot.isInside());

    createDots(dots, dotNum - dots.length, 2, 0);    
}

function mousePressed() {  
    noLoop();
}

function mouseReleased() {
    loop();
}
