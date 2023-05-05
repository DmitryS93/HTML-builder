const path = require('path');
const fs = require('fs');


fs.readdir('./06-build-page', (err, files) => {
  if(err) throw err; // не прочитать содержимое папки
  if (files.indexOf('project-dist') >= 0) {
    fs.rm(path.join(__dirname, 'project-dist'), {recursive:true}, err => {
      if(err) throw err; // не удалось удалить папку
      //console.log('Папка успешно удалена');
      create_folder();
      build_html();
      copy_assets();
    });
  } else {
    create_folder();
    build_html();
    copy_assets();
  }
  console.log('done');
});


async function create_folder() {
  fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if (err) throw err; //Не создать папку
    //console.log('Папка была создана');
    styles();  
  });
}

async function styles() {
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
  //console.log('Выполнен сбор стилей');
}

/*const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  );*/

const writeFile = (path, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve();
    })
  );  

async function build_html() {
  fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      let result = data;
      //console.log(tagsArray);
      //console.log('прочитано');
      fs.appendFile(
        path.join(__dirname, 'project-dist', 'index.html'),
        data,
        err => {
          if (err) throw err;
          //console.log('Файл был изменен');
          fs.readdir('./06-build-page/components', (err, files) => {
            if(err) throw err; //проблема с файлами HTML в папке components
            for (let i=0; i< files.length; i++) {
              fs.readFile(
                path.join(__dirname, 'components', files[i]),
                'utf-8',
                async (err, dataHTMLpart) => {
                  if (err) throw err;
                  //console.log(path.parse(files[i]).name);
                  result = result.replace(`${path.parse(files[i]).name}`, dataHTMLpart);
                  result = result.replace('{{', '');
                  result = result.replace('}}', '');
                  //console.log(result);
                  await writeFile(path.join(__dirname, 'project-dist', 'index.html'), result);
                });
            }
          });
        }
      );
    }
  );
  //console.log('html собран');
}

async function copy_assets(){
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
    if (err) throw err;
    //console.log('Папка была создана');
    fs.cp(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
      if (err) console.log(err);   
    });
    /*fs.readdir('./06-build-page/assets', (err, files) => {
      if (err) console.log(err); 
      for (let i=0; i<files.length; i++) {
      //console.log(files[i]);
        fs.copyFile(path.join(__dirname, 'assets', files[i]), path.join(__dirname, 'project-dist', 'assets', files[i]), err => {
          if(err) throw err; //Ошибка копирования assets
        });
      }
    });*/
  });
  //console.log('done');
}