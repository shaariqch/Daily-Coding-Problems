/**
 * @param {number[]} arr
 * @returns {number}
 */
function largestSumOfNonAdjacentNumbers(arr) {
  let inc = arr[0];
  let exc = 0;
  for (let i = 1; i < arr.length; i++) {
    let temp = Math.max(inc, exc);
    inc = exc + arr[i];
    exc = temp;
  }
  return Math.max(inc, exc);
}

/* Test */
console.log(largestSumOfNonAdjacentNumbers([1, 4, 10, 50, 80, 38])); // 92
console.log(largestSumOfNonAdjacentNumbers([1, 2])); // 2
console.log(largestSumOfNonAdjacentNumbers([2, 1])); // 2
