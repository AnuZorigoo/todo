const list = document.querySelector(".list");
const input = document.querySelector(".todo");
const button = document.querySelector(".addButn");

let content = [];

const ListItem = (content, isChecked) => {
  return `
     <div class="item">
          <input type="checkbox" id="myCheckbox"/>
          <p>${content}</p>
          <button class="delete-btn">Delete</button>
        </div>
    `;
};
const render = () => {
  list.innerHTML = content
    .map((item) => {
      return ListItem(item);
    })
    .join("");
  addListener();
};

const addListener = () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      content = content.filter((item, index) => index !== i);
      render();
    });
  });
};

button.addEventListener("click", () => {
  const value = input.value;
  content.push(value);

  render();
});
let completedTask = [];
