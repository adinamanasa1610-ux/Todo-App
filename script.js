const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active")
            return !task.completed;

        if(currentFilter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach((task,index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button class="complete-btn" data-index="${index}">
                    ✓
                </button>

                <button class="edit-btn" data-index="${index}">
                    Edit
                </button>

                <button class="delete-btn" data-index="${index}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
});

taskList.addEventListener("click",(e)=>{

    const index = e.target.dataset.index;

    if(e.target.classList.contains("delete-btn")){

        tasks.splice(index,1);
    }

    if(e.target.classList.contains("complete-btn")){

        tasks[index].completed =
        !tasks[index].completed;
    }

    if(e.target.classList.contains("edit-btn")){

        const updated = prompt(
            "Edit Task",
            tasks[index].text
        );

        if(updated){
            tasks[index].text = updated;
        }
    }

    saveTasks();
    renderTasks();
});

document.querySelectorAll(".filters button")
.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter =
        button.dataset.filter;

        renderTasks();
    });
});

renderTasks();
