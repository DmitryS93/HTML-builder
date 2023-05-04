const path = require('path');
const fs = require('fs');


fs.readdir('./04-copy-directory', (err, files) => {
  if(err) throw err; // не прочитать содержимое папки
  //console.log(files.indexOf('files-copy'));
  //console.log(files.indexOf('filess'));
  if (files.indexOf('files-copy') >= 0) {
    fs.readdir('./04-copy-directory/files-copy', (err, files) => {
      if (err) console.log(err); 
      for (let i=0; i<files.length; i++) {
        //console.log(files[i]);
        fs.unlink(path.join(__dirname, 'files-copy', files[i]), err => {
          if(err) throw err; // не удалось удалить файл
          //console.log('Файл успешно удалён');
        });
      }
      fs.rmdir(path.join(__dirname, 'files-copy'), err => {
        if(err) throw err; // не удалось удалить папку
        //console.log('Папка успешно удалена');
        fs.mkdir(path.join(__dirname, 'files-copy'), err => {
          if (err) throw err;
          //console.log('Папка была создана');
          fs.readdir('./04-copy-directory/files', (err, files) => {
            if (err) console.log(err); 
            for (let i=0; i<files.length; i++) {
              //console.log(files[i]);
              fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), err => {
                if(err) throw err;
                //console.log('done');
              });
            }
          });
        });  
      });
    });  
  } else {
    fs.mkdir(path.join(__dirname, 'files-copy'), err => {
      if (err) throw err;
      //console.log('Папка была создана');
      fs.readdir('./04-copy-directory/files', (err, files) => {
        if (err) console.log(err); 
        for (let i=0; i<files.length; i++) {
          //console.log(files[i]);
          fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), err => {
            if(err) throw err;
            //console.log('done');
          });
        }
      });
    });
  }
  console.log('done');
});

/*fs.readdir('./04-copy-directory/files-copy', (err, files) => {
  if (err) console.log(err); 
  for (let i=0; i<files.length; i++) {
    console.log(files[i]);
    fs.unlink(path.join(__dirname, 'files-copy', files[i]), err => {
      if(err) throw err; // не удалось удалить файл
      console.log('Файл успешно удалён');
    });
  }
});

fs.rmdir(path.join(__dirname, 'files-copy'), err => {
  if(err) throw err; // не удалось удалить папку
  console.log('Папка успешно удалена');
});*/

/*fs.mkdir(path.join(__dirname, 'files-copy'), err => {
  if (err) throw err;
  console.log('Папка была создана');
});

fs.readdir('./04-copy-directory/files', (err, files) => {
  if (err) console.log(err); 
  for (let i=0; i<files.length; i++) {
    console.log(files[i]);
    fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]), err => {
      if(err) throw err;
      console.log('done');
    });
  }
});*/