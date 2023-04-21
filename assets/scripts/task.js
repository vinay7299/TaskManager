//  Array containing all created tasks and its components
let taskList = [];

//  class for creating a new task
class Task {
    constructor(taskName) {
        this.instance = ++Task.count;
        this.taskName = taskName;
        this.taskId = `task${this.instance}`;
        this.modalId = `modal${this.instance}`;
        this.description = "";
    }
    setDescription(desc) {
        this.description = desc;
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
        console.log(newTask.taskId, newTask.modalId);

        //  creating task in dom
        let open = document.getElementById("open");

        let task = document.createElement("div");

        let taskName = document.createElement("span");

        let buttonDiv = document.createElement("div");

        let descButton = document.createElement("button");
        descButton.innerHTML = "Task Description";

        //  creating modal in dom
        let modal = document.createElement("div");
        let modalContent = document.createElement("div");
        let taskHeadDiv = document.createElement("div");
        let taskDescDiv = document.createElement("div");
        let descControlDiv = document.createElement("div");
        let descSpan = document.createElement("span");
        descSpan.textContent = newTask.taskName;
        let descTextArea = document.createElement("textarea");
        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save Description";
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "Close";

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
        let descButton_attributes = {
            class: "desc-button",
            id: "descButton" + newTask.taskId,
        };

        //  creating attributes for modal elements
        let modal_attributes = { class: "modal", id: newTask.modalId };
        let modalContent_attributes = {
            class: "modal-content",
            id: "modalContent",
        };
        let taskHeadDiv_attributes = { class: "task-heading-div" };
        let taskDescDiv_attributes = { class: "task-description" };
        let descControlDiv_attributes = { class: "description-controls" };
        let descSpan_attributes = { class: "task-heading" };
        let descTextArea_attributes = {
            class: "description-area",
            name: "descriptionArea",
            cols: "30",
            rows: "10",
        };
        let saveButton_attributes = { class: "action-button" };
        let closeButton_attributes = {
            class: "cancel-button",
            id: "cancelButton" + newTask.taskId,
        };

        //  setting attributes
        setAttributes(task, task_attributes);
        setAttributes(taskName, taskName_attributes);
        setAttributes(buttonDiv, buttonDiv_attributes);
        setAttributes(descButton, descButton_attributes);

        //  setting modal element attributes
        setAttributes(modal, modal_attributes);
        setAttributes(modalContent, modalContent_attributes);
        setAttributes(taskHeadDiv, taskHeadDiv_attributes);
        setAttributes(taskDescDiv, taskDescDiv_attributes);
        setAttributes(descControlDiv, descControlDiv_attributes);
        setAttributes(descSpan, descSpan_attributes);
        setAttributes(descTextArea, descTextArea_attributes);
        setAttributes(saveButton, saveButton_attributes);
        setAttributes(closeButton, closeButton_attributes);

        //  appending new elements to open
        taskName.appendChild(document.createTextNode(input));
        buttonDiv.appendChild(descButton);
        task.appendChild(taskName);
        task.appendChild(buttonDiv);
        open.appendChild(task);

        //  appending modal
        let container = document.getElementById("container");
        taskHeadDiv.appendChild(descSpan);
        taskDescDiv.appendChild(descTextArea);
        descControlDiv.appendChild(saveButton);
        descControlDiv.appendChild(closeButton);
        modalContent.appendChild(taskHeadDiv);
        modalContent.appendChild(taskDescDiv);
        modalContent.appendChild(descControlDiv);
        modal.appendChild(modalContent);
        container.appendChild(modal);

        modal.style.display = "none";

        //  adding event listener
        descButton.setAttribute("onclick", "taskDesc(event)");
        closeButton.setAttribute("onclick", "cancel(event)");
        saveButton.setAttribute("onclick", "save(event)");
    } else {
        alert("Input Task Name to continue");
    }
}

//  task description button function
function taskDesc(event) {
    let id = event.target.id;
    id = id.substr(10, id.length - 1);
    let task = taskList.filter((task) => {
        return task.taskId == id;
    });
    let modal = document.getElementById(`${task[0].modalId}`);
    modal.style.display = "block";
}

//  modal close button function
function cancel(event) {
    let id = event.target.id;
    id = id.substr(12, id.length - 1);
    let task = taskList.filter((task) => {
        return task.taskId == id;
    });
    let modal = document.getElementById(`${task[0].modalId}`);
    modal.style.display = "none";
    let textArea = document.querySelector("textarea");
    textArea.innerText = task[0].description;
}

//  modal save button function
function save(event) {
    let id = event.target.id;
    id = id.substr(12, id.length - 1);
    let task = taskList.filter((task) => {
        return task.taskId == id;
    });
    let textArea = document.querySelector("textarea");
    let desc = textArea.innerText;
    task[0].description = desc;
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

    console.log("dropped: " + task.id);

    let dropZone = event.target;
    dropZone.appendChild(task);
    task.classList.remove("drag");
    event.dataTransfer.clearData();
}
