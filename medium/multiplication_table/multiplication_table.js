/**
 * @param {number} N
 * @param {number} X
 * @returns {number}
 */
function getNOccurrences(N, X) {
  let nOccurrences = 0;
  for (let i = 1; i <= N; i++) {
    const remainder = X / i;
    if (Number.isInteger(remainder) && remainder <= N) {
      nOccurrences++;
    }
  }
  return nOccurrences;
}

module.exports = getNOccurrences;
