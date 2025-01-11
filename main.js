const input = document.querySelector(".task-input");
const addBtn = document.querySelector(".add");
const tasksDiv = document.querySelector(".tasks");

let tasks = [];

//create elements
function create(name, id) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    let div = document.createElement("div");
    div.classList.add("container");
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("del");
    let check = document.createElement("input");
    check.type = "checkbox";
    check.id = id;
    let taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", id);
    taskDiv.append(div);
    taskLabel.append(name);
    div.append(check);
    div.append(taskLabel);
    taskDiv.append(delBtn);
    tasksDiv.append(taskDiv);
}

//add tasks
function addTask() {
    //id for each task
    let taskId = Date.now();
    let taskName = input.value;

    if (taskName) {
        //add task to array
        let taskObj = {
            name: taskName,
            id: taskId,
            checked: false,
        };
        tasks.push(taskObj);

        //add task to local storage
        localStorage.setItem("tasksLocal", JSON.stringify(tasks));

        //create task
        create(taskName, taskId);

        tasksDiv.style.visibility = "visible";
        input.value = "";
    }
}
addBtn.onclick = addTask;
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

//delete task
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();

        //remove from array
        tasks = tasks.filter((x) => {
            return x.id != +e.target.previousElementSibling.children[0].id;
        });

        //remove from local storage
        localStorage.setItem("tasksLocal", JSON.stringify(tasks));

        if (tasksDiv.children.length === 0) {
            tasksDiv.style.visibility = "hidden";
        }
    }

    //check task
    if (e.target.type === "checkbox") {
        tasks.forEach((x) => {
            if (e.target.id == x.id) {
                e.target.checked ? (x.checked = true) : (x.checked = false);
            }
        });
        localStorage.setItem("tasksLocal", JSON.stringify(tasks));
    }
});

// Load tasks from local storage
const storedTasks = localStorage.getItem("tasksLocal");
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
        create(task.name, task.id);
        if (task.checked) {
            document.getElementById(task.id).checked = true;
        }
    });
}

//hide tasks div if no tasks
if (tasksDiv.children.length === 0) {
    tasksDiv.style.visibility = "hidden";
}
