/**
 * @param {number} N
 * @param {number} x
 * @returns {number}
 */
function getNOccurrences(N, x) {
  let nOccurrences = 0;
  for (let i = 1; i <= N; i++) {
    const remainder = x / i;
    if (Number.isInteger(remainder) && remainder <= N) {
      nOccurrences++;
    }
  }
  return nOccurrences;
}

/* Test */
const tests = [
  {desc: '1', args: [6, 12], res: 4},
  {desc: '2', args: [4, 18], res: 0},
  {desc: '3', args: [13, 13], res: 2},
  {desc: '4', args: [12, 13], res: 0},
  {desc: '5', args: [0, 13], res: 0},
  {desc: '6', args: [0, 0], res: 0},
];

tests.forEach((test) => {
  const receivedResult = getNOccurrences(...test.args);
  if (test.res === receivedResult) {
    console.log(`Pass: ${test.desc} | ${test.args.join(', ')} => ${test.res}`);
  } else {
    console.log(`\nFail: ${test.desc}`);
    console.log(`expected: ${test.res} | received: ${receivedResult}\n`);
  }
});
