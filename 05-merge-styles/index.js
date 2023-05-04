const path = require('path');
const fs = require('fs');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
    console.log('CSS файл был создан');
  }
);


fs.readdir('./05-merge-styles/styles',{ withFileTypes: true }, (err, files) => {
  if(err) throw err;
  console.log(files);
  for (let i=0; i<files.length; i++) {
    if (files[i].isFile() === true){
      if (path.parse(files[i].name).ext === '.css') {
        console.log(files[i].name);
        fs.readFile(
          path.join(__dirname, 'styles', files[i].name),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            console.log('прочитано');
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'bundle.css'),
              data,
              err => {
                if (err) throw err;
                console.log('Файл был изменен');
              }
            );
          }
        );
      }
    }
  }
});