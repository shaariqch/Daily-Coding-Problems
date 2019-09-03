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
    const tests = [];
    if (!isDir) {
      if (path.extname(fullPath) === '.js') {
        const testPath = path.dirname(fullPath) + 'test.json';
        if (!tests[testPath]) {
          tests[testPath] = JSON.parse(fs.readFileSync(testPath, 'utf-8'));
        }

        
      }
    }
  },
});
