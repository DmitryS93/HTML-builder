const fs = require('fs');
const path = require('path');

/*fs.readFile(
  path.join(__dirname, 'text.txt'),
  'utf-8',
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);*/

/*const stream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));*/

let stream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8');

let data = '';
stream.on('data', function(chunk) {
  data = data + chunk;
});

stream.on('end', function(){
  console.log(data);
});

stream.on('error', function(error){
  console.log('Error', error.message);
});