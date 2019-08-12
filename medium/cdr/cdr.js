function cons(a, b) {
  let pair = (f) => f(a, b);
  return pair;
}

function car(pair) {
  let returnFirst = (a, b) => a;
  return pair(returnFirst);
}

function cdr(pair) {
  let returnLast = (a, b) => b;
  return pair(returnLast);
}

/* Test */
console.log(car(cons('a', 'b'))); // 'a'
console.log(cdr(cons('a', 'b'))); // 'b'
