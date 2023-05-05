const fs = require('fs');
const path = require('path');

/*let stream = fs.createWriteStream(
  path.join(__dirname, 'text.txt'),
  'utf-8');*/

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
    console.log('Введите текст');
  }
);

const { stdin, stdout } = process;



stdin.on('data', function(data){
  if (data.toString().trim() === 'exit') {
    process.exit();
  } fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
      if (err) throw err;
      console.log('Файл был изменен');
    });
});

process.on('exit', () => stdout.write('Удачи!'));
process.on('SIGINT', function() {
  process.exit();
});