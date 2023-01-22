const density = '.Mateo';

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size (64, 32);
  asciiDiv = createDiv();
  asciiDiv.addClass('texto-principal');
}

function draw() {
  video.loadPixels();
  let asciiImage = '';

  for(let j = 0; j < video.height; j ++){
    for(let i = 0; i < video.width; i ++){
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1]; 
      const b = video.pixels[pixelIndex + 2];
      
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0,len));
      const escala = map(avg, 0, 255, 0.2, 1);
      const rotacion = map(avg, 0, 255, -90, 180);

      const c = density.charAt(charIndex);
      const color = `rgb(${r}, ${g}, ${b})`;

        if(c == '') asciiImage += '&nbsp';
         else 
           asciiImage += 
          `<span style = "display: inline-block;
          color:${color}; 
          transform: scale(${escala}) rotate(${rotacion}deg)">` 
           + c + 
           '</span>';
      }
            asciiImage += '<br/>';
  }
              asciiDiv.html(asciiImage);
}