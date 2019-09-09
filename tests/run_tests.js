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

function isEqual(a, b) {
  if (typeof a !== 'object' && typeof b !== ' object') {
    return a === b;
  }

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
  const result = {
    timeTaken: 0,
    hasPassed: false,
    received: null,
  };

  const nanoPerSec = 1e9;
  const nanoPerMilli = 1000000;
  const timeStart = process.hrtime();

  result.received = func(...test.args);

  const timeStop = process.hrtime(timeStart);
  const timeInNano = timeStop[0] * nanoPerSec + timeStop[1];
  const timeInMilli = timeInNano / nanoPerMilli;

  result.timeTaken = timeInMilli;

  result.hasPassed = isEqual(test.exp, result.received);

  return result;
}

function displayTestSuite(tSuite) {
  process.stdout.write(`\nTest: ${tSuite.fileName} => ${tSuite.funcName}\n\n`);
  tSuite.tests.forEach((test) => {
    if (test.hasPassed) {
      process.stdout.write(
        `Test: ${test.desc} \u2713 | ${test.args.join(', ')} => ${test.exp} in ${
          test.timeTaken
        } ms\n`,
      );
    } else {
      process.stdout.write(
        `\nTest: ${test.desc} \u2717 in ${test.timeTaken} ms\nexpected: ${test.exp} | received: ${test.received}\n\n`,
      );
    }
  });

  process.stdout.write(
    `\nTotal Time: ${tSuite.totalTime} ms, Avg Time: ${tSuite.totalTime /
      tSuite.tests
        .length} ms\n_______________________________________________________________________________\n`,
  );
}

function displayFinalStats(totalFilesTested, totalTestsPassed, totalTestsFailed) {
  process.stdout.write(`\nTotal files tested: ${totalFilesTested}\n\n`);
  process.stdout.write(`Total tests ran: ${totalTestsPassed + totalTestsFailed}\n`);
  process.stdout.write(`Passed: ${totalTestsPassed}\n`);
  process.stdout.write(`Failed: ${totalTestsFailed}\n`);
}

fileScannerSync({
  path: '.',
  recursive: true,
  excludeList: ['tests', '.git'],
  callback: (relativePath, isDir) => {
    if (!isDir) {
      const tests = [];
      const tSuite = {
        fileName: '',
        funcName: '',
        totalTime: 0,
        tests: [],
      };

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

          tSuite.fileName = path.basename(relativePath);
          tSuite.funcName = funcToBeTested.name;

          tSuite.totalTime = 0;
          tests[testPath].tests.forEach((test) => {
            const testRes = runTest(test, funcToBeTested);

            tSuite.tests.push({...test, ...testRes});
            tSuite.totalTime += testRes.timeTaken;

            if (testRes.hasPassed) {
              totalTestsPassed++;
            } else {
              totalTestsFailed++;
            }
          });
          displayTestSuite(tSuite);
        }
      }
    }
  },
});

displayFinalStats(totalFilesTested, totalTestsPassed, totalTestsFailed);

process.exit(totalTestsFailed);
