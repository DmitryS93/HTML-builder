const path = require('path');
const fs = require('fs');

fs.readdir('./03-files-in-folder/secret-folder',{ withFileTypes: true }, (err, files) => {
  if (err) console.log(err); 
  for (let i=0; i<files.length; i++) {
    let isFile = files[i].isFile();
    let result = '';
    let name = path.parse(files[i].name).name;
    let ext = path.parse(files[i].name).ext;
    ext = ext.slice(1);
    //console.log(path.parse(files[i].name).name);
    //console.log(path.parse(files[i].name).ext);
    let size = '';
    fs.stat(path.join(__dirname, 'secret-folder', files[i].name), (error, stats) => {
      if (error) {
        console.log(error);
      }
      else {  
        //console.log(path.join(__dirname, 'secret-folder', files[i].name));
        console.log(stats.size);
        size = String(Number(stats.size/1024).toFixed(2)) + 'kb';
        console.log(size);
        result = name + ' - ' + ext + ' - ' + size;
        if (isFile === true) {
          console.log(result);
        }    
      }  
    });
  }
});