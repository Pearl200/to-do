document.addEventListener("DOMContentLoaded", (event) => {
  let form = document.getElementById("form");
  let textInput = document.getElementById("textInput");
  let tasks = document.getElementById("tasks");

  let data = JSON.parse(localStorage.getItem("data")) || [];

  let resetForm = () => {
    document.getElementById("form").reset();
  };

  let createTasks = () => {
    if (!data) return;
    tasks.innerHTML = "";
    data.map((task, index) => {
      tasks.innerHTML += `
        <div class="item" id=${index}>
          <div class="flex-row" id="leftSide">
            <input type="checkbox" class="custom-checkbox" ${task.completed ? "checked" : ""} onClick="toggleTaskCompletion(${index})">
            <p>${task.text}</p>
          </div>
          <div class="flex-row" id="rightSide">
            <span class="small text-secondary">${task.timestamp}</span>
            <button type="button" class="editBtn" data-index="${index}">
              <iconify-icon icon="akar-icons:edit" width="1.2em" height="1.2em"></iconify-icon>
            </button>
            <button type="button" class="deleteBtn" data-index="${index}">
              <iconify-icon icon="arcticons:trashcan" width="24" height="24"></iconify-icon>
            </button>
          </div>
        </div>
      `;
    });

    // Add event listeners to delete buttons
    let deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach((element) => {
      element.addEventListener("click", (event) => {
        let clickIndex = element.getAttribute("data-index");
        data = data.filter((item, index) => index !== parseInt(clickIndex));
        localStorage.setItem("data", JSON.stringify(data));
        createTasks();
      });
    });

    // Add event listeners to edit buttons
    let editBtns = document.querySelectorAll(".editBtn");
    editBtns.forEach((element) => {
      element.addEventListener("click", (event) => {
        let clickIndex = element.getAttribute("data-index");
        let newValue = window.prompt("Edit your task:", data[clickIndex].text);
        if (newValue !== null && newValue.trim() !== "") {
          data[clickIndex].text = newValue;
          localStorage.setItem("data", JSON.stringify(data));
          createTasks();
        }
      });
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });

  let formValidation = () => {
    if (!textInput.value) {
      console.log("failure");
    } else {
      acceptData();
    }
  };

  let acceptData = () => {
    const timestamp = new Date().toLocaleString();
    data.push({
      text: textInput.value,
      timestamp: timestamp,
      completed: false,
    });
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    resetForm();
  };

  createTasks();
});

function toggleTaskCompletion(index) {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data[index].completed = !data[index].completed;
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
}
