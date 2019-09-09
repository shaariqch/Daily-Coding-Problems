const fs = require('fs');
const path = require('path');

const testSpecified = process.argv[2];

let totalFilesTested = 0;
let totalTestsPassed = 0;
let totalTestsFailed = 0;

function escapeRegExp(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function arrContains(list, val) {
  let isContains = false;

  list.forEach((ele) => {
    let eleRegExp;

    if (typeof ele === 'string') {
      eleRegExp = new RegExp(`^${escapeRegExp(ele)}$`);
    } else {
      // type is RegExp
      eleRegExp = ele;
    }

    if (val.match(eleRegExp)) {
      isContains = true;
    }
  });

  return isContains;
}

function isDir(dirPath) {
  return fs.statSync(dirPath).isDirectory();
}

function fileScannerSync(args) {
  if (fs.existsSync(args.path) && !arrContains(args.excludeList, path.basename(args.path))) {
    if (!isDir(args.path)) {
      args.callback(path.normalize(args.path), false);
      return;
    }

    const dirList = fs.readdirSync(args.path);

    dirList.forEach((item) => {
      if (!arrContains(args.excludeList, path.basename(item))) {
        const relativePath = path.join(args.path, item);

        if (args.recursive) {
          const argsCallback = Object.assign({}, args);
          argsCallback.path = relativePath;
          fileScannerSync(argsCallback);
        } else {
          args.callback(path.normalize(relativePath), isDir(relativePath));
        }
      }
    });

    args.callback(path.normalize(args.path), true);

    return;
  }
}

function isObjectEquivalent(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}

function runTest(test, func) {
  const returnObj = {
    timeTaken: 0,
    hasPassed: false,
    received: null,
  };

  const nanoPerSec = 1e9;
  const nanoPerMilli = 1000000;
  const timeStart = process.hrtime();

  returnObj.received = func(...test.args);

  const timeStop = process.hrtime(timeStart);
  const timeInNano = timeStop[0] * nanoPerSec + timeStop[1];
  const timeInMilli = timeInNano / nanoPerMilli;

  returnObj.timeTaken = timeInMilli;

  if (typeof test.exp === 'object') {
    returnObj.hasPassed = isObjectEquivalent(test.exp, returnObj.received);
  } else {
    returnObj.hasPassed = test.exp === returnObj.received;
  }

  return returnObj;
}

fileScannerSync({
  path: '.',
  recursive: true,
  excludeList: ['tests', '.git'],
  callback: (relativePath, isDir) => {
    const tests = [];
    let totalTimeTaken = 0;

    if (!isDir) {
      if (
        path.extname(relativePath) === '.js' &&
        (testSpecified === undefined || relativePath.indexOf(testSpecified) !== -1)
      ) {
        const testPath = path.join(path.dirname(relativePath), 'test.json');

        if (fs.existsSync(testPath)) {
          totalFilesTested++;
          const funcToBeTested = require(path.join('..' + path.sep, relativePath));

          if (!tests[testPath]) {
            tests[testPath] = JSON.parse(fs.readFileSync(testPath, 'utf-8'));
          }

          process.stdout.write(
            `\nTest: ${path.basename(relativePath)} => ${funcToBeTested.name}\n\n`,
          );

          tests[testPath].tests.forEach((test) => {
            const testResObj = runTest(test, funcToBeTested);
            totalTimeTaken += testResObj.timeTaken;

            if (testResObj.hasPassed) {
              totalTestsPassed++;
              process.stdout.write(
                `Test: ${test.desc} \u2713 | ${test.args.join(', ')} => ${test.exp} in ${
                  testResObj.timeTaken
                } ms\n`,
              );
            } else {
              totalTestsFailed++;
              process.stdout.write(`\nTest: ${test.desc} \u2717 in ${testResObj.timeTaken} ms\n`);
              process.stdout.write(`expected: ${test.exp} | received: ${testResObj.received}\n\n`);
            }
          });

          process.stdout.write(
            `\nTotal Time: ${totalTimeTaken} ms, Avg Time: ${totalTimeTaken /
              tests[testPath].tests.length} ms\n`,
          );

          process.stdout.write(
            '_______________________________________________________________________________\n',
          );
        }
      }
    }
  },
});

process.stdout.write(`\nTotal files tested: ${totalFilesTested}\n\n`);
process.stdout.write(`Total tests ran: ${totalTestsPassed + totalTestsFailed}\n`);
process.stdout.write(`Passed: ${totalTestsPassed}\n`);
process.stdout.write(`Failed: ${totalTestsFailed}\n`);
