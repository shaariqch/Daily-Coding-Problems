/**
 * @param {string} s
 * @returns {string}
 */
function longestSubstringWithKDistinctChars(s, k) {
  let nDistinct = 0;
  let lastDistinctCharIndex = 0;
  let currS = '';
  let lastS = '';
  for (let i = 0; i < s.length; i++) {
    const charIndex = currS.indexOf(s[i]);
    console.log(charIndex);
    
    if (charIndex === -1) {
      nDistinct++;
      console.log(nDistinct);
      
    }

    if (nDistinct <= k) {
      if (charIndex === -1) {
        lastDistinctCharIndex = currS.length;
      }
      currS += s[i];
    } else {
      if (currS.length >= lastS.length) {
        lastS = currS;
      }
      currS = currS.slice(lastDistinctCharIndex) + s[i];
      if (charIndex !== -1) {
        nDistinct--;
      }
    }
  }
  return currS.length >= lastS.length ? currS : lastS;
}

/* Test */
console.log(longestSubstringWithKDistinctChars('saaabcbae', 2));
