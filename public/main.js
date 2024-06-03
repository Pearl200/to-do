let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let taskList = document.getElementById("taskList");

let data = [];



form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});
//treat onClick


let formValidation = () => {
  if (!textInput.value) {
    console.log("failure");
  } else {
   acceptData()
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
  console.log(data);
  createTasks();
};



//bug with the rendering of the taskList 
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((task, index) => {
    return (tasks.innerHTML += `
    <div id=${index}>
    <input type="checkbox" ${
      task.completed ? "checked" : ""
    } onClick="toggleTaskCompletion(${index})">
    <span class="fw-bold ${task.completed ? "completed" : ""}">${
      task.text
    }</span>
    <span class="small text-secondary">${task.date}</span>

   <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  const taskId = e.parentElement.parentElement.id;
  data.splice(taskId, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

function append(ul, data) {
  try {
    ul.appendChild(document.createElement("li")).innerHTML = data;
  } catch {
    console.error(e);
    console.log("error");
  }
}
