const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

let items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  console.log(`There are now ${items.length} items on your shopping list.`);
  e.target.reset();
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
      <input type="checkbox" value=${item.id} ${item.complete && "checked"}>
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}" value=${item.id}>&times;</button>
  </li>`
    )
    .join("");
  console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.info("Saving Items To Local Storage");
  localStorage.setItem("items", JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info("Restoring From Local Storage");
  const lsItems = JSON.parse(localStorage.getItem("items"));
  if (lsItems.length) {
    // lsItems.forEach((item) => items.push(item));
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function deleteItem(id) {
  console.log("DELETING ITEM", id);
  items = items.filter((item) => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsComplete(id) {
  console.log("marking as COMPLETE", id);
  const itemRef = items.find((item) => item.id === id);
  console.log(itemRef);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", mirrorToLocalStorage);
list.addEventListener("click", (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches("button")) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
