const fs = require('fs');
const path = require('path');
const mdit = require('markdown-it')();

const dirPath = path.join(process.cwd(), './2023/04/'); // 要转换的目录路径

function convertFile(filePath) {
  fs.readFile(filePath, 'utf-8', (err, md) => {
    if (err) throw err;
    const html = mdit.render(md);
    const newFilePath = path.join(path.dirname(filePath), path.basename(filePath, '.md') + '.html');
    fs.writeFile(newFilePath, html, 'utf-8', err => {
      if (err) throw err;
      console.log(`File "${filePath}" converted successfully!`);
    });
  });
}

function traverseDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const extname = path.extname(file);
      if (fs.statSync(filePath).isDirectory()) {
        traverseDirectory(filePath);
      } else if (extname === '.md') {
        convertFile(filePath);
      }
    });
  });
}

traverseDirectory(dirPath);