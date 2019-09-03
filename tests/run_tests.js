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
        fileScannerSync({
          dirPath: fullPath,
          recursive: args.recursive,
          excludeList: args.excludeList,
          callback: args.callback,
        });
      }
      args.callback(fullPath, true);
    } else {
      args.callback(fullPath, false);
    }
  });
}

function runTest(test, func) {
  const nanoPerSec = 1e9;
  const nanoPerMilli = 1000000;
  const timeStart = process.hrtime();

  const receivedResult = func(...test.args);

  const timeStop = process.hrtime(timeStart);
  const timeInNano = timeStop[0] * nanoPerSec + timeStop[1];
  const timeInMilli = timeInNano / nanoPerMilli;

  if (test.exp === receivedResult) {
    process.stdout.write(
      `Pass: ${test.desc} | ${test.args.join(', ')} => ${
        test.exp
      } in ${timeInMilli} ms\n`,
    );
  } else {
    process.stdout.write(`\nFail: ${test.desc}\n`);
    process.stdout.write(
      `expected: ${test.exp} | received: ${receivedResult}\n\n`,
    );
  }

  return timeInMilli;
}

fileScannerSync({
  dirPath: '.',
  recursive: true,
  excludeList: ['tests', '.git'],
  callback: (fullPath, isDir) => {
    const tests = [];
    let totalTimeTaken = 0;
    if (!isDir) {
      if (path.extname(fullPath) === '.js') {
        const testPath = path.join(path.dirname(fullPath), 'tests.json');

        if (fs.existsSync(testPath)) {
          const funcToBeTested = require(path.join('..' + path.sep, fullPath));

          if (!tests[testPath]) {
            tests[testPath] = JSON.parse(fs.readFileSync(testPath, 'utf-8'));
          }

          process.stdout.write(
            `\nTest: ${path.basename(fullPath)} => ${funcToBeTested.name}\n\n`,
          );

          tests[testPath].tests.forEach((test) => {
            totalTimeTaken += runTest(test, funcToBeTested);
          });
          process.stdout.write(
            `\nTotal Time: ${totalTimeTaken}, Avg Time: ${totalTimeTaken /
              tests[testPath].tests.length}\n`,
          );

          process.stdout.write(
            '_______________________________________________________________________________\n',
          );
        }
      }
    }
  },
});
