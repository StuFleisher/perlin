

/** Maps a number within a range to a proportional number within another range
 *
 * linear(1, 0, 1, 0, 100) --> 100
 * linear(0, 0, 1, 0, 100) --> 0
 * linear(.5, 0, 1, 0, 100) --> 50
*/

function linear (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export {linear}