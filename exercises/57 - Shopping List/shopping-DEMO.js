// Topics: Custom Events, Event Delegation, local storage, DOM Events, Object Reference,

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    items = lsItems;
    // fire event
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (!e.target.item.value) return;
  const item = {
    id: Date.now(),
    name: e.target.item.value,
    complete: false,
  };
  items.push(item);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
  e.target.reset();
}

function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  console.log(itemRef);
  // this is just a reference to the item
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function deleteItem(id) {
  console.log(items, id);
  // find the item's index
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
    <input value="${item.id}" type="checkbox" ${
        item.complete ? `checked` : ``
      } name="item-${item.id}"/>
    <span class="itemName">${item.name}</span>
    <button aria-label="Remove ${item.name} "value="${item.id}">×</button>
  </li>`
    )
    .join('');
  list.innerHTML = html;
}

shoppingForm.addEventListener('submit', handleSubmit);

// List is an empty div where we add items with JS
list.addEventListener('click', e => {
  if (e.target.matches('button')) {
    deleteItem(parseFloat(e.target.value));
  }
});

list.addEventListener('input', e => {
  if (e.target.matches('input')) {
    markAsComplete(parseFloat(e.target.value));
  }
});

list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

restoreFromLocalStorage();

// Challenge - put the done items at the bottom
