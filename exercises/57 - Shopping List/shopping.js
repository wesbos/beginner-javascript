// listen for input and submit events
// keep track of list items and their completion status
// render out list of items

// select all items we need

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// STATE OF STATE
// we need an array to hold our state

let items = [];

// add Event Listener with submit handler function

function handleSubmit(e) {
  e.preventDefault(); // stop default behavior (of adding URL stub)
  // current target alone here would be the form itself, so add .item
  // .target is the thing that is ACTUALLY clicked on
  // .currentTarget is the thing that you are listening on (refer to bubbling)

  const name = e.currentTarget.item.value;
  // if its empty, then dont submit
  if (!name) return;
  console.log(name);
  const item = {
    name,
    // hack to get a unique ID, if less than 1 per ms
    id: Date.now(),
    complete: false,
  };
  // Push the items into STATE
  items.push(item);
  console.log(`There are now ${items.length} in your state`);
  // clear all the inputs in a form
  e.target.reset();

  // do 4 things here? instead, use the event system with a custom event
  // dispatch custom event that tells anyone else who cares that the items were updated
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// buildHTML from your array! and add it with innerHTML

// taking input from the user and displaying it as HTML is a security risk!
// these inputs must be cleaned

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
    <input value="${item.id}"
    type="checkbox"
    ${item.complete ? 'checked' : ''}
    >
    <span class="itemName">${item.name}</span>
    <button 
    aria-label="Remove ${item.name}"
    value="${item.id}" 
    >&times;</button>
    </li>`
    )
    .join('');

  console.log(html);
  list.innerHTML = html;
}

// LOCAL STORAGE
// local storage is TEXT ONLY

// use JSON to convert objects to strings

// mirror data to local storage with a function
function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
  console.info('Saving items to local storage');
}

// function to restore from local storage on page reload

function restoreFromLocalStorage() {
  console.info('restoring from storage');
  // turn strings into array again
  const lsItems = JSON.parse(localStorage.getItem('items'));
  // check if there are any stored items
  if (lsItems.length) {
    // lsItems.forEach((item) => items.push(item)); //this works
    // items.push(lsItems[0]); // this works too
    items.push(...lsItems); // this is a nice clean way to do it
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('deleting item...', id);
  // update our items array without this one
  items = items.filter((item) => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('marking complete...', id);
  const itemReference = items.find((item) => item.id === id);
  // simple true false toggle
  itemReference.complete = !itemReference.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// if you try to listen for clicks for things that dont exist on the page, it will not
// attach an event listener to that element

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// when you remove an item from the DOM and replace it, all of its event listeners are lost
// and they need to be manually added back
// so, use EVENT DELEGATION

// listen on the UL list for a click, but then delegate the click event to the button
// if the button is what was clicked

list.addEventListener('click', function (e) {
  const id = parseInt(e.target.value);
  // when you click the button, take the value and pass it to deleteItem()
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
