/**
 * @param {number[]} arr
 * @returns {number}
 */
function largestProductBy3Integers(arr) {
  if (arr.length < 3) {
    throw 'Array needs to have at least 3 integers';
  }

  let a = arr[0];
  let b = arr[1];
  let c = arr[2];

  for (let i = 3; i < arr.length; i++) {
    let product = a * b * c;
    let productA = arr[i] * b * c;
    let productB = a * arr[i] * c;
    let productC = a * b * arr[i];
    let maxProduct = Math.max(productA, productB, productC);

    if (maxProduct > product) {
      if (maxProduct === productA) {
        a = arr[i];
      } else if (maxProduct === productB) {
        b = arr[i];
      } else if (maxProduct === productC) {
        c = arr[i];
      }
    }
  }
  return a * b * c;
}

module.exports = largestProductBy3Integers;
