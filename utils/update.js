const fs = require('fs');
const path = require('path');

const directory = './2020';

function replaceInFiles(directory, searchString, replaceString) {
  // 读取目录下的所有文件和子目录
  const files = fs.readdirSync(directory, { withFileTypes: true });

  // 遍历文件和子目录
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      // 如果是子目录，递归调用replaceInFiles函数
      replaceInFiles(filePath, searchString, replaceString);
    } else if (file.isFile() && path.extname(file.name) === '.html') {
      // 如果是HTML文件，读取文件内容并替换字符串
      console.log(file)

      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(new RegExp(searchString, 'g'), replaceString);

      // 更新文件内容
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

replaceInFiles(directory, 'css\\/', '');