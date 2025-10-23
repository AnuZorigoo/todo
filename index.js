const list = document.querySelector(".list");
const input = document.querySelector(".todo");
const addBtn = document.querySelector(".add-btn");
const buttons = document.querySelectorAll(".filter-btn");

let content = [];
let type = "All";

let id = 1;

const ListItem = (item) => {
  return `
     <div class="item">
          <input id= "${item.id}" type="checkbox" class="checkbox" ${
    item.isDone ? "checked" : ""
  }/>
          <p style="text-decoration: ${item.isDone ? "line-through" : "none"};">
        ${item.text}
      </p>
          <button id= "${item.id}"class="delete-btn">Delete</button>
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
  input.value = "";

  console.log(content);

  render();
});

buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("chosen");
    });
    btn.classList.add("chosen");
    if (i === 0) {
      type = "All";
    } else if (i === 1) {
      type = "Active";
    } else {
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

  addListeners();
};

const addListeners = () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      content = content.filter((item) => item.id != btn.id);
      render();
    });
  });

  const checkboxes = document.querySelectorAll(".checkbox");

  checkboxes.forEach((checkbox, i) => {
    checkbox.addEventListener("click", () => {
      content[i].isDone = !content[i].isDone;
      render();
    });
  });
};
