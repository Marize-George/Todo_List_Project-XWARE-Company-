// Without using local storage
// const taskInput = document.getElementById("task-input");
// const addButton = document.getElementById("add-task");
// const taskList = document.getElementById("task-list");
// const taskItems = taskList.querySelectorAll("tr");


// taskItems.forEach(row => {
//     const doneButton = row.querySelector("button[id^=done]");
//     doneButton.addEventListener("click", () => {
//         row.classList.toggle("completed");
//     });

//     const deleteButton = row.querySelector("button[id^=delete]");
//     deleteButton.addEventListener("click", () => {
//         row.remove();
//     });

//     const editButton = row.querySelector("button[id^=edit]");
//     editButton.addEventListener("click", () => {
//         row.classList.remove("completed");
//         const taskCell = row.querySelector("td:first-child");
//         const newText = prompt("Edit task:", taskCell.taskItems);
//         if (newText !== null) {
//             taskCell.textContent = newText;
//         }
//     });
// });
// addButton.addEventListener("click", () => {
//     const taskText = taskInput.value;
//     if (taskText !== "") {
//         const newRow = document.createElement("tr");
//         const taskCell = document.createElement("td");
//         const actionCell = document.createElement("td");

//         // const inputCheckBox = document.createElement("input");
//         // inputCheckBox.type = "checkbox";

//         taskCell.textContent = taskText;
//         const doneButton = document.createElement("button");
//         doneButton.style.color = "white";
//         doneButton.style.backgroundColor = "Salmon";
//         doneButton.style.fontSize = "15px";
//         doneButton.style.border = "none";
//         doneButton.textContent = "Done";
//         doneButton.style.marginRight = "10px";
//         doneButton.style.height = "25px";
//         doneButton.style.width = "50px";
        
//         doneButton.addEventListener("click", () => {
//           newRow.classList.toggle("completed"); 
//         //   inputCheckBox.checked = !inputCheckBox.checked;
//         //   if (inputCheckBox.checked) {
//         //     newRow.style.border = "10px solid green"; 
//         //   } else {
//         //     newRow.style.border = "none"; 
//         //   }
//         });
        

//         const deleteButton = document.createElement("button");
//         deleteButton.style.color = "white"
//         deleteButton.style.backgroundColor = "Fuchsia"
//         deleteButton.style.fontSize = "20"
//         deleteButton.style.border = " none"
//         deleteButton.style.marginRight = "10px";
//         deleteButton.style.height = "25px";
//         deleteButton.style.width = "50px";
//         deleteButton.textContent = "Delete";
//         deleteButton.addEventListener("click", () => {
//             newRow.remove();
//         });

//         const editButton = document.createElement("button");
//         editButton.style.color = "white"
//         editButton.style.backgroundColor = "Lime"
//         editButton.style.fontSize = "20"
//         editButton.style.border = " none"
//         editButton.style.marginRight = "10px";
//         editButton.style.height = "25px";
//         editButton.style.width = "50px";
//         editButton.textContent = "Edit";
//         editButton.addEventListener("click", () => {
//             newRow.classList.remove("completed");
//             const newText = prompt("Edit task:", taskText);
//             if (newText !== null) {
//                 taskCell.textContent = newText;
//             }
//         });


//         actionCell.appendChild(deleteButton);
//         actionCell.appendChild(doneButton);
//         actionCell.appendChild(editButton);
//         newRow.appendChild(taskCell);
//         newRow.appendChild(actionCell);
//         taskList.appendChild(newRow);
//         actionCell.appendChild(inputCheckBox);


//         taskInput.value = "";
//     }
// });

//  using local storage

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function createButton(text, color, onClick) {
    const button = document.createElement("button");
    button.style.color = "white";
    button.style.backgroundColor = color;
    button.style.fontSize = "15px";
    button.style.border = "none";
    button.style.marginRight = "10px";
    button.style.height = "25px";
    button.style.width = "50px";
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

function addTask(taskText, isCompleted = false) {
    const newRow = document.createElement("tr");
    const taskCell = document.createElement("td");
    const actionCell = document.createElement("td");

    taskCell.textContent = taskText;
    if (isCompleted) {
        newRow.classList.add("completed");
    }

    const doneButton = createButton("Done", "Salmon", () => {
        newRow.classList.toggle("completed");
        saveData();
    });

    const deleteButton = createButton("Delete", "Fuchsia", () => {
        newRow.remove();
        saveData();
    });

    const editButton = createButton("Edit", "Lime", () => {
        const newText = prompt("Edit task:", taskText);
        if (newText !== null) {
            taskCell.textContent = newText;
            saveData();
        }
    });

    actionCell.appendChild(doneButton);
    actionCell.appendChild(deleteButton);
    actionCell.appendChild(editButton);
    newRow.appendChild(taskCell);
    newRow.appendChild(actionCell);
    taskList.appendChild(newRow);
}

function saveData() {
    const tasks = [];
    taskList.querySelectorAll("tr").forEach(row => {
        const taskText = row.querySelector("td:first-child").textContent;
        const isCompleted = row.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showData() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}

addButton.addEventListener("click", () => {
    const taskText = taskInput.value;
    if (taskText !== "") {
        addTask(taskText);
        saveData();
        taskInput.value = ""; 
    }
});

window.addEventListener("load", showData);
