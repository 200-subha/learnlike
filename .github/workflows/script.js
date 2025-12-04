// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskValue);
    saveTask(taskValue);

    taskInput.value = "";
}

// Create task element (UI)
function createTask(taskText) {
    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.className = "task";

    let span = document.createElement("span");
    span.textContent = taskText;

    span.onclick = () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    };

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = () => {
        li.remove();
        deleteTask(taskText);
    };

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
}

// Save to LocalStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from LocalStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text);
        if (task.completed) {
            let items = document.querySelectorAll(".task");
            items[items.length - 1].classList.add("completed");
        }
    });
}

// Update completion status in LocalStorage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from LocalStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updated = tasks.filter(t => t.text !== taskText);

    localStorage.setItem("tasks", JSON.stringify(updated));
}
