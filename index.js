const list = document.querySelector(".list");
const input = document.querySelector(".todo");
const addBtn = document.querySelector(".add-btn");
const filterButtons = document.querySelectorAll(".filter-btn");

let content = [];
let type = "All";

let id = 1;

const ListItem = (item) => {
  return `
     <div class="item">
          <input type="checkbox" id="Checkbox" ${item.isDone ? "checked" : ""}/>
          <p>${item.text}</p>
          <button class="delete-btn">Delete</button>
        </div>
    `;
};
addBtn.addEventListener("click", () => {
  content.push({
    id: id,
    text: input.value,
    isDone: false,
  });
  id++;

  render();
});

filterButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((button) => {
      button.classList.remove("chosen");
    });
    btn.classList.add("chosen");
    if (i == 0) {
      type = "All";
    } else if (i == 1) {
      type = "Active";
    } else if (i == 2) {
      type = "Completed";
    }
    render();
  });
});
const render = () => {
  const elements = content
    .filter((item) => {
      if (type === "All") return true;
      if (type === "Active") return item.isDone === false;
      return item.isDone === true;
    })
    .map((item) => ListItem(item))
    .join("");
  list.innerHTML = elements;
  addListener();
};

const addListener = () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      content = content.filter((item, index) => index !== i);
      render();
    });
  });
};
const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox, i) => {
  checkbox.addEventListener("click", () => {
    content[i].isDone = !content[i].isDone;
    render();
  });
});
