// make utility functions generalized!
export function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    console.log('already used!');
    return randomItemFromArray(arr, not);
  }
  return item;
}
