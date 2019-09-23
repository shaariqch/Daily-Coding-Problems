function visit(visited, mat, i, j) {
  if (i < 0 || j < 0 || i >= mat.length || j >= mat[0].length) {
    return;
  }

  if (visited[i][j] || !mat[i][j]) {
    return;
  }

  visited[i][j] = 1;
  visit(visited, mat, i + 1, j);
  visit(visited, mat, i, j + 1);
  visit(visited, mat, i - 1, j);
  visit(visited, mat, i, j - 1);
}

/**
 *
 * @param {number[][]} mat
 * @returns {number}
 */
function matrix_islands(mat) {
  let islandCount = 0;

  const visited = Array(mat.length)
    .fill()
    .map(() => Array(mat[0].length).fill(0));

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (!visited[i][j] && mat[i][j]) {
        islandCount++;
        visit(visited, mat, i, j);
      }
    }
  }
  return islandCount;
}

module.exports = matrix_islands;
