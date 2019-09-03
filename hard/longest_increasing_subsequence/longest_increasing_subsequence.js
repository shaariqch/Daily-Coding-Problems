/**
 * @param {number[]} arr
 * @returns {number}
 */
function longest_increasing_subsequence_Length(arr) {
  if (arr.length === 0) {
    throw 'Array is empty';
  }

  const lis = Array(arr.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && lis[i] <= lis[j] + 1) {
        lis[i] = lis[j] + 1;
      }
    }
  }

  return Math.max(...lis);
}

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function longest_increasing_subsequence_Array(arr) {
  if (arr.length === 0) {
    throw 'Array is empty';
  }

  const lis = Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    lis[i] = Array();
    lis[i].push(arr[i]);
  }

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && lis[i].length <= lis[j].length + 1) {
        lis[i] = [...lis[j], arr[i]];
      }
    }
  }

  return lis.reduce((acc, val) => (acc.length >= val.length ? acc : val));
}

module.exports = longest_increasing_subsequence_Length;
