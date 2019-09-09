/**
 * count the number of ways the message can be decoded
 * @param {string} enMsg encoded message
 * @returns {number}
 */
function countDecodeWays(enMsg) {
  let result = 0;
  if (enMsg[0] === '0') {
    return 0;
  } else if (enMsg.length === 1 || enMsg.length === 0) {
    return 1;
  } else {
    result = countDecodeWays(enMsg.slice(1));
    if (Number(enMsg.slice(0, 2)) <= 26) {
      result += countDecodeWays(enMsg.slice(2));
    }
  }
  return result;
}

/**
 * @param {string} enMsg
 * @returns {number}
 */
function getNDecodeWays(enMsg) {
  if (enMsg.match(/[^\d]+/g)) {
    throw 'Encoded message can only contain numbers';
  }

  return countDecodeWays(enMsg);
}

module.exports = countDecodeWays;
