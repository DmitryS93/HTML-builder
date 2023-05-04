const path = require('path');
const fs = require('fs');

//clear_folder();
delete_folder();
//create_folder();
//styles();

/*fs.readdir('./06-build-page', (err, files) => {
  if(err) throw err; // не прочитать содержимое папки
  if (files.indexOf('project-dist') >= 0) {
    fs.readdir('./06-build-page/project-dist', (err, files) => {
      if (err) console.log(err); 
      for (let i=0; i<files.length; i++) {
        console.log(files[i]);
        fs.unlink(path.join(__dirname, 'project-dist', files[i]), err => {
          if(err) throw err; // не удалось удалить файл
          console.log('Файл успешно удалён');
        });
      }
      fs.rmdir(path.join(__dirname, 'project-dist'), err => {
        if(err) throw err; // не удалось удалить папку
        console.log('Папка успешно удалена');
        fs.mkdir(path.join(__dirname, 'project-dist'), err => {
          if (err) throw err;
          console.log('Папка была создана');
          styles();
        });
      });
    });
  } else {
    fs.mkdir(path.join(__dirname, 'project-dist'), err => {
      if (err) throw err;
      console.log('Папка была создана');
      styles();
    });
  }
});*/


function delete_folder() {
  fs.readdir('./06-build-page', (err, files) => {
    if(err) throw err; // не прочитать содержимое папки
    if (files.indexOf('project-dist') >= 0) {
      fs.rm(path.join(__dirname, 'project-dist'), {recursive:true}, err => {
        if(err) throw err; // не удалось удалить папку
        console.log('Папка успешно удалена');
      });
    }
  });
}



function clear_folder() {
  fs.readdir('./06-build-page', (err, files) => {
    if(err) throw err; // не прочитать содержимое папки
    if (files.indexOf('project-dist') >= 0) {
      fs.readdir('./06-build-page/project-dist', (err, files) => {
        if (err) console.log(err); 
        for (let i=0; i<files.length; i++) {
          console.log(files[i]);
          fs.unlink(path.join(__dirname, 'project-dist', files[i]), err => {
            if(err) throw err; // не удалось удалить файл
            console.log('Файл успешно удалён');
          });
        }
      });
    }
  });
}

function create_folder() {
  fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if (err) throw err; //Не создать папку
    console.log('Папка была создана');
    styles();  
  });
}

function styles() {
  fs.readdir('./06-build-page/styles',{ withFileTypes: true }, (err, files) => {
    if(err) throw err;
    //console.log(files);
    for (let i=0; i<files.length; i++) {
      if (files[i].isFile() === true){
        if (path.parse(files[i].name).ext === '.css') {
        //console.log(files[i].name);
          fs.readFile(
            path.join(__dirname, 'styles', files[i].name),
            'utf-8',
            (err, data) => {
              if (err) throw err;
              //console.log('прочитано');
              fs.appendFile(
                path.join(__dirname, 'project-dist', 'style.css'),
                data,
                err => {
                  if (err) throw err;
                //console.log('Файл был изменен');
                }
              );
            }
          );
        }
      }
    }
  });
  console.log('Выполнен сбор стилей');
}