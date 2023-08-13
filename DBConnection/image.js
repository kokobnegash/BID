const fs = require('fs');
const sharp = require('sharp');


function img(buffer) {

const imageBuffer = buffer // Your image buffer data here

// Specify the output image format and path
const outputImagePath = 'output.jpg'; // Change the extension according to your desired format

// Use sharp to convert the buffer to an image
sharp(imageBuffer)
  .toFile(outputImagePath, (err, info) => {
    if (err) {
      console.error('Error converting buffer to image:', err);
    } else {
      console.log('Image converted successfully:', info);
    }
  });
  return outputImagePath;
}
// Assuming you have the binary image data in a Buffer

module.exports=img;  