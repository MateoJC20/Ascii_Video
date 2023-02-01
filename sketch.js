const density = '.MateoJC'; //esta variable crea el ascii del video
const density2 = '.+*131000M'; 

let video;
let asciiDiv;

//crear Matrix digital rain to background



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
  //cargar los pixeles del video
  for(let j = 0; j < video.height; j ++){
    for(let i = 0; i < video.width; i ++){
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1]; 
      const b = video.pixels[pixelIndex + 2];
      
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0,len));
      const escala = map(avg, 0, 255, 0.2, 1.3);
      const rotacion = map(avg, 0, 255, -90, 180);
      

        const len2 = density2.length;
        const charIndex2 = floor(map(avg, 0, 255, 0, len2));
        const d = density2.charAt(charIndex2);
        const rotación2 = map(avg, 0, 255, 45, -90);

      //dale color a las letras con la profundidad del video
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


           if(d == '') asciiImage += '&nbsp';
         else 
           asciiImage += 
          `<span style = "display: inline-block;
          color:${color}; 
          transform: scale(${escala}) rotate(${rotación2}deg)">` 
           + d + 
           '</span>';
      }
            asciiImage += '<br/>';
  }
              asciiDiv.html(asciiImage);
}


