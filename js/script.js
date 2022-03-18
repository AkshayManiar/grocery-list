const basketItem = document.getElementById("item");
const itemsList = document.getElementById("itemsList");
const newList = document.getElementById("newList");
const addItem = document.getElementById("addItem");
const myBasketList = JSON.parse(localStorage.getItem("myList"));

if (myBasketList) {
  myBasketList.forEach((item) => {
    addItemtoList(item);
  });
}

addItem.addEventListener("click", () => {
  if (basketItem.value) {
    addItemtoList(basketItem);
  }
});

function addItemtoList(item) {
  let itemText;
  if (item.value) {
    itemText = item.value;
  }
  if (item.text) {
    itemText = item.text;
  }
  const itemEle = document.createElement("li");
  if (item.text && item.mark) {
    itemEle.classList.add("completed");
  }
  itemEle.innerHTML = itemText;
  itemEle.addEventListener("click", () => {
    itemEle.classList.toggle("completed");
    updateLS();
  });
  itemEle.addEventListener("dblclick", () => {
    itemEle.remove();
    updateLS();
  });
  itemsList.appendChild(itemEle);
  basketItem.value = "";
  updateLS();
}

function updateLS() {
  const itemsEle = document.querySelectorAll("li");
  const myList = [];
  itemsEle.forEach((itemEle) => {
    myList.push({
      text: itemEle.innerText,
      mark: itemEle.classList.contains("completed"),
    });
  });
  localStorage.setItem("myList", JSON.stringify(myList));
}

newList.addEventListener("click", () => {
  localStorage.setItem("myList", JSON.stringify(null));
  itemsList.innerHTML = "";
});
