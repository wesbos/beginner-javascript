// using async await means this request will only be made when the event fires

export async function handleButtonClick(event) {
  // use destructuring renaming when managing safe words like default
  const { localCurrency, default: currency } = await import('./currencies.js');
  console.log(localCurrency, currency);
}
