const fs = require('fs');
const path = require('path');

function fileScannerSync(args) {
  if (!fs.statSync(args.dirPath).isDirectory()) {
    args.callback(args.dirPath, false);
    return;
  }
  var dirList = fs.readdirSync(args.dirPath);
  dirList.forEach(function(item) {
    var fullPath = path.join(args.dirPath, item);
    var stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      if (args.recursive && !args.excludeList.includes(item)) {
        fileScannerSync(args);
      }
      args.callback(fullPath, true);
    } else {
      args.callback(fullPath, false);
    }
  });
}

fileScannerSync({
  dirPath: '.',
  recursive: true,
  excludeList: ['tests'],
  callback: (fullPath, isDir) => {
    if (!isDir) {
      if (path.extname(fullPath) === '.js') {
        path.dirname(fullPath) + 'test.json';
      }
    }
  },
});
