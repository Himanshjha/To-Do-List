document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const prioritySelect = document.getElementById("priority-select");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const colorToggleButtons = document.querySelectorAll(".color-toggle");
    const dateTimeDisplay = document.getElementById("date-time");
    
    // Load tasks from local storage
    loadTasks();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        
        if (taskText !== "") {
            addTask(taskText, priority);
            saveTasks();
            taskInput.value = "";
        }
    });
    
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
    
    colorToggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.body.style.background = button.dataset.color;
            localStorage.setItem("themeColor", button.dataset.color);
        });
    });
    
    function addTask(text, priority) {
        const li = document.createElement("li");
        li.classList.add(`priority-${priority}`);
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-task">❌</button>
        `;
        
        li.querySelector(".delete-task").addEventListener("click", () => {
            li.classList.add("fade-out");
            setTimeout(() => {
                li.remove();
                saveTasks();
            }, 300);
        });
        
        taskList.appendChild(li);
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(li => {
            tasks.push({ text: li.querySelector("span").innerText, priority: li.classList[0].split("-")[1] });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTask(task.text, task.priority));
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
        if (localStorage.getItem("themeColor")) {
            document.body.style.background = localStorage.getItem("themeColor");
        }
    }
    
    function updateDateTime() {
        const now = new Date();
        const formattedTime = now.toLocaleString();
        dateTimeDisplay.textContent = formattedTime;
    }
});
