/**
 * @param {number[]} arr
 * @returns {number}
 */
function largestProductBy3Integers(arr) {
  let a = arr[0];
  let b = arr[1];
  let c = arr[2];

  for (let i = 3; i < arr.length; i++) {
    let product = a * b * c;
    let productA = arr[i] * b * c;
    let productB = a * arr[i] * c;
    let productC = a * b * arr[i];
    let maxProduct = Math.max(...arr);

    if (maxProduct > product) {
      switch (maxProduct) {
        case productA:
          a = arr[i];
          break;
        case productB:
          b = arr[i];
          break;
        case productC:
          c = arr[i];
          break;
        default:
          break;
      }
    }
  }
  return a * b * c;
}

/* Test */

console.log(largestProductBy3Integers([-10, -10, 5, 2])); // 500
console.log(largestProductBy3Integers([5, 8, 9, 0])); // 360
