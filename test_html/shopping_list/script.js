function main() {
  const shoppingList = document.querySelector("ul");
  const inputNewItem = document.querySelector("input");
  const buttonAddItem = document.querySelector("#buttonAddItem");

  inputNewItem.value = "";
  buttonAddItem.addEventListener("click", addItem);
  inputNewItem.addEventListener("keypress", function (event) {
    if (event.key === "Enter") addItem();
  });
}

function addItem() {
  const shoppingList = document.querySelector("ul");
  const inputNewItem = document.querySelector("input");
  const newListElement = document.createElement("li");
  const newItemLabel = document.createElement("label");
  const buttonDeleteItem = document.createElement("button");

  let newItem = inputNewItem.value;
  if (!newItem) return; // Doesn't add item if input is empty
  newItemLabel.textContent = newItem;
  inputNewItem.value = "";
  buttonDeleteItem.textContent = "Delete";
  buttonDeleteItem.addEventListener("click", function () {
    shoppingList.removeChild(newListElement);
  });
  inputNewItem.focus();

  newItemLabel.appendChild(buttonDeleteItem);
  newListElement.appendChild(newItemLabel);
  shoppingList.appendChild(newListElement);
}

main();