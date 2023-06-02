//  Array containing all created tasks and its components
let taskList = [];
if (localStorage.getItem("taskList") != null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

//  class for creating a new task
class Task {
    constructor(taskName) {
        this.instance = ++Task.count;
        this.taskName = taskName;
        this.taskId = `task${this.instance}`;
        this.description = "";
        this.status = "open";
    }
}

// counter to count the instances of Task class
Task.count = 0;

//  taking input to create new task
let taskInput = document.getElementById("taskInput");
if (taskInput) {
    taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
            console.log("enter");
        }
    });
}

//  helper function to set attributes
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//  creating and adding a new task
function addTask() {
    //  taking task name from input
    let input = document.getElementById("taskInput").value;

    //  checking if input field is empty
    if (input) {
        // creating new Task instance
        let newTask = new Task(input);
        taskList.push(newTask);
        localStorage.setItem("taskList", JSON.stringify(taskList));

        console.log(newTask.taskId);

        //  creating task in dom
        let open = document.getElementById("open");

        let task = document.createElement("div");

        let taskName = document.createElement("span");

        let buttonDiv = document.createElement("div");

        let delButton = document.createElement("button");
        delButton.innerHTML = "Delete Task";

        let descButton = document.createElement("button");
        descButton.innerHTML = "Task Description";

        //  creating attributes for new elements
        let task_attributes = {
            class: "task",
            draggable: "true",
            ondragstart: "dragStart(event)",
            id: newTask.taskId,
            ondragover: "",
            ondragleave: "",
        };
        let taskName_attributes = { class: "taskName" };
        let buttonDiv_attributes = { class: "button-div", id: "buttonDiv" };
        let delButton_attributes = {
            class: "del-button",
            id: "delButton" + newTask.taskId,
        };
        let descButton_attributes = {
            class: "desc-button",
            id: "descButton" + newTask.taskId,
        };

        //  setting attributes
        setAttributes(task, task_attributes);
        setAttributes(taskName, taskName_attributes);
        setAttributes(buttonDiv, buttonDiv_attributes);
        setAttributes(delButton, delButton_attributes);
        setAttributes(descButton, descButton_attributes);

        //  appending new elements to open
        taskName.appendChild(document.createTextNode(input));
        buttonDiv.appendChild(delButton);
        buttonDiv.appendChild(descButton);
        task.appendChild(taskName);
        task.appendChild(buttonDiv);
        open.appendChild(task);

        //  adding event listener
        descButton.setAttribute("onclick", "taskDesc(event)");
        delButton.setAttribute("onclick", "delTask(event)");
    } else {
        alert("Input Task Name to continue");
    }
}

//  delete Task button function
function delTask(event) {
    let id = event.target.id;
    id = id.substr(9, id.length - 1);
    console.log(id);

    document.getElementById(id).style.display = "none";

    taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList = taskList.filter((task) => {
        return task.taskId != id;
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
}

//  task description button function
function taskDesc(event) {
    let id = event.target.id;
    id = id.substr(10, id.length - 1);
    console.log(id);

    let task = taskList.filter((task) => {
        return task.taskId == id;
    });
    let modal = document.getElementById("modal");
    let span = document.getElementById("taskHeading");
    let textarea = document.getElementsByClassName("description-area")[0];

    span.innerText = task[0].taskName;
    textarea.value = task[0].description;

    modal.setAttribute("currentTask", id);
    modal.style.display = "block";
}

//  modal close button function
function cancel(event) {
    let modal = document.getElementById("modal");
    let span = document.getElementById("taskHeading");
    let textarea = document.getElementsByName("descriptionArea");
    span.innerText = "";
    textarea.innerText = "";
    modal.setAttribute("currentTask", "");
    modal.style.display = "none";
}

//  modal save button function
function save(event) {
    let modal = document.getElementById("modal");
    let id = modal.getAttribute("currentTask");

    let task = taskList.filter((task) => {
        return task.taskId == id;
    });
    let textArea = document.getElementsByName("descriptionArea")[0];
    let desc = textArea.value;
    task[0].description = desc;
    console.log(desc);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

//  dragging functionality
//
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log("dragging started: " + event.target.id);
    event.target.classList.add("drag");
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
    console.log("drag enter");
}

function dragOver(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
    console.log("drag over");
}

function dragLeave(event) {
    event.preventDefault();
    event.target.classList.remove("drag-over");
    console.log("drag leave");
}

function drop(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove("drag-over");

    let id = event.dataTransfer.getData("text");
    let task = document.getElementById(id);

    let dropZone = event.target;

    let status = dropZone.id;

    let droppedTask = taskList.filter((task) => {
        return task.taskId == id;
    });

    droppedTask[0].status = status;

    dropZone.appendChild(task);
    task.classList.remove("drag");
    event.dataTransfer.clearData();

    localStorage.setItem("taskList", JSON.stringify(taskList));
}

//  populating locally stored tasks on page refresh
setTimeout(() => {
    if (localStorage.getItem("taskList") != null) {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    taskList.forEach((element) => {
        let section = document.getElementById(element.status);

        //  creating task in dom
        let task = document.createElement("div");

        let taskName = document.createElement("span");

        let buttonDiv = document.createElement("div");

        let delButton = document.createElement("button");
        delButton.innerHTML = "Delete Task";

        let descButton = document.createElement("button");
        descButton.innerHTML = "Task Description";

        //  creating attributes for new elements
        let task_attributes = {
            class: "task",
            draggable: "true",
            ondragstart: "dragStart(event)",
            id: element.taskId,
            ondragover: "",
            ondragleave: "",
        };
        let taskName_attributes = { class: "taskName" };
        let buttonDiv_attributes = { class: "button-div", id: "buttonDiv" };
        let delButton_attributes = {
            class: "del-button",
            id: "delButton" + element.taskId,
        };
        let descButton_attributes = {
            class: "desc-button",
            id: "descButton" + element.taskId,
        };

        //  setting attributes
        setAttributes(task, task_attributes);
        setAttributes(taskName, taskName_attributes);
        setAttributes(buttonDiv, buttonDiv_attributes);
        setAttributes(delButton, delButton_attributes);
        setAttributes(descButton, descButton_attributes);

        //  appending new elements to section
        taskName.appendChild(document.createTextNode(element.taskName));
        buttonDiv.appendChild(delButton);
        buttonDiv.appendChild(descButton);
        task.appendChild(taskName);
        task.appendChild(buttonDiv);
        section.appendChild(task);

        //  adding event listener
        delButton.setAttribute("onclick", "delTask(event)");
        descButton.setAttribute("onclick", "taskDesc(event)");
    });
}, 1);
