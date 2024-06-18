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
  console.log(data);
  createTasks();
};

//bug with the rendering of the taskList
let createTasks = () => {
  if (!data) return;
  tasks.innerHTML = "";
  data.map((task, index) => {
    return (tasks.innerHTML += `
    <div class="item" id=${index}>
       <div class= "flex-row" id="leftSide"> 
       <input type="checkbox" id="checkbox" ${
        task.completed ? "checked" : ""
      } onClick="toggleTaskCompletion(${index})" >
      <p>${task.text}</p>
       </div>
       <div class= "flex-row" id="rightSide">
       <span class="small text-secondary">${`11.55pm`}</span>

       <button type="button" onclick="deleteTask(this)" > 
         <iconify-icon icon="arcticons:trashcan" width="24" height="24" ></iconify-icon>
       </button>
       </div>
       
     
      </div>
    `);
  });

  resetForm();
};

function deleteTask(e) {
  const task_Id = e.parentElement.parentElement.id;
  data.splice(task_Id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
}

/* let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[1].innerHTML;

}; */

let resetForm = () => {
  document.getElementById("form").reset();
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
