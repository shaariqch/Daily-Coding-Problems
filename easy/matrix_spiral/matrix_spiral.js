/**
 * returns a 1d array
 * containing the elements of the matrix in spiral order
 * @param {number[][]} mat
 * @returns {number[]}
 */
function matrixSpiral(mat) {
  let rFinish = mat.length;
  let cFinish = mat[0].length;
  let rStart = 0;
  let cStart = 0;
  const arrSpiral = [];

  while (rStart < rFinish && cStart < cFinish) {
    for (let i = rStart; i < cFinish; i++) {
      arrSpiral.push(mat[rStart][i]);
    }
    rStart++;
    if (rStart >= rFinish) break;

    for (let i = rStart; i < rFinish; i++) {
      arrSpiral.push(mat[i][cFinish - 1]);
    }
    cFinish--;
    if (cStart >= cFinish) break;

    for (let i = cFinish - 1; i >= cStart; i--) {
      arrSpiral.push(mat[rFinish - 1][i]);
    }
    rFinish--;

    for (let i = rFinish - 1; i >= rStart; i--) {
      arrSpiral.push(mat[i][cStart]);
    }
    cStart++;
  }

  return arrSpiral;
}

function displayMatrixSpiral(mat) {
  const spiral = matrixSpiral(mat);
  console.log(spiral.join('\n'));
}

module.exports = matrixSpiral;
