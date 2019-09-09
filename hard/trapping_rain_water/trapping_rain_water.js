/**
 * @param bars {number[][]}
 * @returns number
 */
function trapping_rain_water(bars) {
  const left = [];
  const right = [];
  let water = 0;

  left[0] = bars[0];
  for (let i = 1; i < bars.length; i++) {
    left[i] = Math.max(left[i - 1], bars[i]);
  }

  right[bars.length - 1] = bars[bars.length - 1];
  for (let i = bars.length - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], bars[i]);
  }

  for (let i = 0; i < bars.length; i++) {
    water += Math.min(left[i], right[i]) - bars[i];
  }

  return water;
}

module.exports = trapping_rain_water;
