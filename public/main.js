document.addEventListener("DOMContentLoaded", (event) => {
  let form = document.getElementById("form");
  let textInput = document.getElementById("textInput");
  let dateInput = document.getElementById("dateInput");
  let textarea = document.getElementById("textarea");
  let msg = document.getElementById("msg");
  let tasks = document.getElementById("tasks");
  let add = document.getElementById("add");
  let taskList = document.getElementById("taskList");
  let paragraph = document.getElementById("edit");
  let save = document.getElementById("save");

  let data = [];

  let resetForm = () => {
    document.getElementById("form").reset();
  };

  let createTasks = () => {
    if (!data) return;
    tasks.innerHTML = "";
    data.map((task, index) => {
      return (tasks.innerHTML += `
    <div class="item" id=${index}>
       <div class= "flex-row" id="leftSide"> 
       <input type="checkbox" class="custom-checkbox" id="checkbox" ${
         task.completed ? "checked" : ""
       } onClick="toggleTaskCompletion(${index})" >
      <p>${task.text}</p>
       </div>
       <div class= "flex-row" id="rightSide">
       <span class="small text-secondary">${`11.55pm`}</span>
       <span class="editBtn" index="${index}">
      <button type="button" > 
       <iconify-icon icon="akar-icons:edit" width="1.2em" height="1.2em"></iconify-icon>
     </button>
     </span>
       <button type="button"  class ="deleteBtn"   > 
         <iconify-icon icon="arcticons:trashcan" width="24" height="24" ></iconify-icon>
       </button>
       </div>
      </div>
    `);
    });

    // function deleteTask(e) {
    //   const task_Id = e.parentElement.parentElement.id;
    //   data.splice(task_Id, 1);
    //   localStorage.setItem("data", JSON.stringify(data));
    //   console.log(data);
    //   createTasks();
    // }

    // add a class to the delete button
    // add event listeners to all delete buttons just like the edit buttons
    // make sure it works

    if (data.length > 0) {
      let deleteBtns = document.querySelectorAll(".deleteBtn");

      deleteBtns.forEach((element) => {
        element.addEventListener("click", (event) =>{
        
        } );
      });
    }

    if (data.length > 0) {
      let editBtns = document.querySelectorAll(".editBtn");

      editBtns.forEach((element)=> {
        element.addEventListener("click", (event) => {
          console.log(element.attributes.value.index);
          window.prompt("Edit your task ");
        });
      });
    }

    resetForm();
  };

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
  })();

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
    // console.log(data);
    createTasks();
  };

  function append(ul, data) {
    try {
      ul.appendChild(document.createElement("li")).innerHTML = data;
    } catch {
      console.error(e);
      console.log("error");
    }
  }
});
