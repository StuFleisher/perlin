function _basicCompare(a,b){
  if (a>b) return 1;
  if (a===b) return 0;
  if (a<b) return -1;
}

/** Merges two sorted arrays into a new sorted array.
 * The optional compare argument allows users to pass a custom sorting algorithm
 */

function merge(left, right, compare=_basicCompare) {
  let leftPointer = 0;
  let rightPointer = 0;
  let merged = [];

  while (merged.length < (left.length + right.length)) {

    if (compare(left[leftPointer],right[rightPointer]) < 1 ||
      right[rightPointer] === undefined) {
      merged.push(left[leftPointer]);
      leftPointer++;
    } else {
      merged.push(right[rightPointer]);
      rightPointer++;
    }
  }

  return merged;
}

/** Takes an array and returns a sorted copy of that array.
 *
 * The optional compare argument allows users to pass a custom sorting algorithm
*/

function mergeSort(arr, compare=_basicCompare) {

  const merged = [];
  let midPoint = Math.floor(arr.length / 2);
  let left = arr.slice(0, midPoint);
  let right = arr.slice(midPoint, arr.length);

  if (left.length > 1) left = mergeSort(left);
  if (right.length > 1) right = mergeSort(right);

  merged.push(...merge(left, right, compare));

  return merged;
}

export { merge, mergeSort };