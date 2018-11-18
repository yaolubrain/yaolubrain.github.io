function setup() {
  createCanvas(200, 200);
}


let toff = 0;
function draw() {

	
  loadPixels();
	
	let ls = [];

	let yoff = 0;


	for (let x = 0; x < width; x++) {		
		let xoff = 0;
		for (let y = 0; y < height; y++) {			
			let r1 =  noise(xoff+10,yoff+10,toff);
			let r2 =  noise(xoff+20,yoff+20,toff);
			let r3 =  noise(xoff+30,yoff+30,toff);
      if (r1 > r2 && r1 > r3) {
        ls.push(0);
      } else if (r2 > r1 && r2 > r3) {
        ls.push(1);
      } else {
        ls.push(2);
      }

			xoff += 0.01;
		}
		yoff += 0.01;
	}	
		
	yoff = 0;
	for (let x = 0; x < width; x++) {		
		let xoff = 0;
		for (let y = 0; y < height; y++) {
			let index = (x + y*width) * 4;
						      
      if (x-1<0 || x+1>=width || y-1<0 || y+1>=height) {
        continue;
      }
      
      let idx = x + y*width;
      let idx1 = x-1 + y*width;
      let idx2 = x+1 + y*width;
      let idx3 = x + (y-1)*width;
      let idx4 = x + (y+1)*width;
      						
			if (ls[idx] != ls[idx1] || 
          ls[idx] != ls[idx2] ||
          ls[idx] != ls[idx3] || 
          ls[idx] != ls[idx4]) {
				pixels[index + 0] = 255;
				pixels[index + 1] = 255;
				pixels[index + 2] = 255;         
      } else {
				pixels[index + 0] = 0;
				pixels[index + 1] = 0;
				pixels[index + 2] = 0;          
			} 

			pixels[index + 3] = 255;						
			xoff += 0.01;
		}
		yoff += 0.01;
	}

	for (let x = 0; x < width; x++) {		
		pixels[(x + 0*width) * 4 + 0] = 255;
		pixels[(x + 0*width) * 4 + 1] = 255;
		pixels[(x + 0*width) * 4 + 2] = 255;
		pixels[(x + 0*width) * 4 + 3] = 255;
		pixels[(x + 1*width) * 4 + 0] = 255;
		pixels[(x + 1*width) * 4 + 1] = 255;
		pixels[(x + 1*width) * 4 + 2] = 255;
		pixels[(x + 1*width) * 4 + 3] = 255;
		pixels[(x + (height-1)*width) * 4 + 0] = 255;
		pixels[(x + (height-1)*width) * 4 + 1] = 255;
		pixels[(x + (height-1)*width) * 4 + 2] = 255;
		pixels[(x + (height-1)*width) * 4 + 3] = 255;
		pixels[(x + (height-2)*width) * 4 + 0] = 255;
		pixels[(x + (height-2)*width) * 4 + 1] = 255;
		pixels[(x + (height-2)*width) * 4 + 2] = 255;
		pixels[(x + (height-2)*width) * 4 + 3] = 255;
  }
	for (let y = 0; y < height; y++) {		
		pixels[(0 + y*width) * 4 + 0] = 255;
		pixels[(0 + y*width) * 4 + 1] = 255;
		pixels[(0 + y*width) * 4 + 2] = 255;
		pixels[(0 + y*width) * 4 + 3] = 255;
		pixels[(1 + y*width) * 4 + 0] = 255;
		pixels[(1 + y*width) * 4 + 1] = 255;
		pixels[(1 + y*width) * 4 + 2] = 255;
		pixels[(1 + y*width) * 4 + 3] = 255;
		pixels[(width-1 + y*width) * 4 + 0] = 255;
		pixels[(width-1 + y*width) * 4 + 1] = 255;
		pixels[(width-1 + y*width) * 4 + 2] = 255;
		pixels[(width-1 + y*width) * 4 + 3] = 255;
		pixels[(width-2 + y*width) * 4 + 0] = 255;
		pixels[(width-2 + y*width) * 4 + 1] = 255;
		pixels[(width-2 + y*width) * 4 + 2] = 255;
		pixels[(width-2 + y*width) * 4 + 3] = 255;

  }


	
	toff += 0.005;
		
	updatePixels();


}
