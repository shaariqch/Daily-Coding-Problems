/**
 * @param {string} s1
 * @param {string} s2
 * @returns {number}
 */
function longest_common_subsequence(s1, s2, i, j) {
  if (i === s1.length || j === s2.length) {
    return 0;
  }

  if (s1[i] === s2[j]) {
    return 1 + longest_common_subsequence(s1, s2, i + 1, j + 1);
  } else {
    Math.max(
      longest_common_subsequence(s1, s2, i + 1, j),
      longest_common_subsequence(s1, s2, i, j + 1),
    );
  }
}

function longest_common_subsequenceDP(s1, s2) {
  let lcs = Array(s1.length + 1).fill(0);
  lcs = lcs.map(() => Array(s2.length + 1).fill(0));

  for (let i = 0; i <= s1.length; i++) {
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0 || j === 0) {
        lcs[i][j] = 0;
      } else if (s1[i - 1] === s2[j - 1]) {
        lcs[i][j] = 1 + lcs[i - 1][j - 1];
      } else {
        lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
      }
    }
  }

  return lcs[s1.length][s2.length];
}

/**
 * @param {string} s
 * @returns {number}
 */
function fewest_insertions_palindrome(s) {
  let revS = s
    .split('')
    .reverse()
    .join('');
  let lcs = longest_common_subsequenceDP(s, revS);
  return s.length - lcs;
}

module.exports = fewest_insertions_palindrome;
