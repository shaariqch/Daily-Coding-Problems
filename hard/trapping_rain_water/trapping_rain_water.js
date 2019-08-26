/**
 * @param bars {number[][]}
 * @returns number
 */
function trapping_rain_water(bars) {
  let lastBar = bars[0];
  let bucket = 0;
  let water = 0;

  for (let i = 1; i < bars.length; i++) {
    if (bars[i] < lastBar) {
      bucket += lastBar - bars[i];
    } else {
      lastBar = bars[i];
      water += bucket;
      bucket = 0;
    }
    debugger;
  }

  return water;
}

/* Test */
console.log(trapping_rain_water([-1, 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
