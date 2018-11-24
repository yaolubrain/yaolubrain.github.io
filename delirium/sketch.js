let img_old, img_new;
let psize = 5;
let W = 600;
let H = 475;
let t_off = 0;

function setup() {
  createCanvas(W, H);
  img_old = loadImage("starry_night.jpg");
  img_new = createImage(W-100, H-100);
}


function draw() {
  img_old.loadPixels();
  img_new.loadPixels();

  let nx = W / psize;
  let ny = H / psize;

  let y_off1 = 0;
  let y_off2 = 10;
	for (let x = 0; x < W-100; x += psize) {
    let x_off1 = 0;
    let x_off2 = 0;
		for (let y = 0; y < H-100; y += psize) {
      let i_new = int(map(noise(x_off1,y_off1,t_off), 0, 1, -50, 50));
      let j_new = int(map(noise(x_off2,y_off2,t_off), 0, 1, -50, 50));

      for (let i = 0; i < psize; ++i) {
        for (let j = 0; j < psize; ++j) {
          let loc1 = (x+i + (y+j) * (W-100)) * 4;

          let x_new = x+50+i+i_new;
          let y_new = y+50+j+j_new;

          if (x_new < 0 || x_new >= W || y_new < 0 || y_new >= H) {
            continue;
          }
          let loc2 = (x_new + (y_new) * W) * 4;
          img_new.pixels[loc1 + 0] = img_old.pixels[loc2 + 0];
          img_new.pixels[loc1 + 1] = img_old.pixels[loc2 + 1];
          img_new.pixels[loc1 + 2] = img_old.pixels[loc2 + 2];
          img_new.pixels[loc1 + 3] = img_old.pixels[loc2 + 3];
        }
      }
      x_off1 += 0.01;
      x_off2 += 0.01;
    }
    y_off1 += 0.01;
    y_off2 += 0.01;
	}

  t_off += 0.01;
	img_new.updatePixels();
  image(img_new, 0, 0);
}
