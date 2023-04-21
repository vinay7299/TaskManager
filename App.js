// let createBtn = document.getElementById("create-btn");

// let taskInput = document.getElementById("taskInput");
// if (taskInput) {
//     taskInput.addEventListener("keyup", (event) => {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             addTask();
//             console.log("enter");
//         }
//     });
// }

// function setAttributes(element, attributes) {
//     for (let key in attributes) {
//         element.setAttribute(key, attributes[key]);
//     }
// }

// function addTask() {
//     let input = document.getElementById("taskInput").value;
//     if (input) {
//         let modalId = generateId();
//         let open = document.getElementById("open");
//         let task = document.createElement("div");
//         let taskName = document.createElement("span");
//         let buttonDiv = document.createElement("div");
//         let descButton = document.createElement("button");

//         let task_attributes = {
//             class: "task",
//             draggable: "true",
//             ondragstart: "dragStart(event)",
//             id: "generateId()",
//             ondragover: "",
//             ondragleave: "",
//         };
//         let taskName_attributes = { class: "taskName" };
//         let buttonDiv_attributes = { class: "button-div", id: "buttonDiv" };
//         let descButton_attributes = {
//             class: "desc-button",
//             id: "descButton",
//             onclick: "taskDesc(modalId)",
//         };

//         setAttributes(task, task_attributes);
//         setAttributes(taskName, taskName_attributes);
//         setAttributes(buttonDiv, buttonDiv_attributes);
//         setAttributes(descButton, descButton_attributes);

//         descButton.innerHTML = "Task Description";

//         taskName.appendChild(document.createTextNode(input));
//         buttonDiv.appendChild(descButton);
//         task.appendChild(taskName);
//         task.appendChild(buttonDiv);
//         open.appendChild(task);

//         let container = document.getElementById("container");

//         let modal = document.createElement("div");
//         let modalContent = document.createElement("div");
//         let taskHeadDiv = document.createElement("div");
//         let taskDescDiv = document.createElement("div");
//         let descControlDiv = document.createElement("div");
//         let descSpan = document.createElement("span");
//         descSpan.innerHTML = input;
//         let descTextArea = document.createElement("textarea");
//         let editButton = document.createElement("button");
//         editButton.innerHTML = "Edit Description";
//         let closeButton = document.createElement("button");
//         closeButton.innerHTML = "Close";

//         let modal_attributes = { class: "modal", id: modalId };
//         let modalContent_attributes = {
//             class: "modal-content",
//             id: "modalContent",
//         };
//         let taskHeadDiv_attributes = { class: "task-heading-div" };
//         let taskDescDiv_attributes = { class: "task-description" };
//         let descControlDiv_attributes = { class: "description-controls" };
//         let descSpan_attributes = { class: "task-heading" };
//         let descTextArea_attributes = {
//             class: "description-area",
//             name: "descriptionArea",
//             cols: "30",
//             rows: "10",
//         };
//         let editButton_attributes = { class: "action-button" };
//         let closeButton_attributes = {
//             class: "cancel-button",
//             onclick: "cancel(this)",
//         };

//         modal.classList.add("hide");

//         setAttributes(modal, modal_attributes);
//         setAttributes(modalContent, modalContent_attributes);
//         setAttributes(taskHeadDiv, taskHeadDiv_attributes);
//         setAttributes(taskDescDiv, taskDescDiv_attributes);
//         setAttributes(descControlDiv, descControlDiv_attributes);
//         setAttributes(descSpan, descSpan_attributes);
//         setAttributes(descTextArea, descTextArea_attributes);
//         setAttributes(editButton, editButton_attributes);
//         setAttributes(closeButton, closeButton_attributes);

//         taskHeadDiv.appendChild(descSpan);
//         taskDescDiv.appendChild(descTextArea);
//         descControlDiv.appendChild(editButton);
//         descControlDiv.appendChild(closeButton);
//         modalContent.appendChild(taskHeadDiv);
//         modalContent.appendChild(taskDescDiv);
//         modalContent.appendChild(descControlDiv);
//         modal.appendChild(modalContent);
//         container.appendChild(modal);

//         // modal.classList.remove("hide");
//     } else {
//         alert("Input Task Name to continue");
//     }
// }

// function taskDesc(modalId) {
//     modalId.classList.remove("hide");
// }

// function cancel(ref) {
//     ref.parentNode.parentNode.parentNode.classList.add("hide");
// }

// function generateId() {
//     return Math.random().toString(36).slice(2);
// }

// function dragStart(event) {
//     event.dataTransfer.setData("text", event.target.id);
//     console.log("dragging started: " + event.target.id);
//     event.target.classList.add("drag");
//     setTimeout(() => {
//         event.target.classList.add("hide");
//     }, 1);
// }

// function dragEnter(event) {
//     event.preventDefault();
//     event.target.classList.add("drag-over");
//     console.log("drag enter");
// }

// function dragOver(event) {
//     event.preventDefault();
//     event.target.classList.add("drag-over");
//     console.log("drag over");
// }

// function dragLeave(event) {
//     event.preventDefault();
//     event.target.classList.remove("drag-over");
//     console.log("drag leave");
// }

// function drop(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     event.target.classList.remove("drag-over");

//     let id = event.dataTransfer.getData("text");
//     let task = document.getElementById(id);

//     console.log("dropped: " + task.id);

//     let dropZone = event.target;
//     dropZone.appendChild(task);
//     task.classList.remove("hide");
//     task.classList.remove("drag");
//     event.dataTransfer.clearData();
// }

// =====================================================

// =====================================================

//  Array containing all created tasks and its components
let taskList = [];

//  class for creating a new task
class Task {
    constructor() {
        this.instance = ++Task.count;
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
        let newTask = new Task();
        taskList.push(newTask);
        console.log(newTask.taskId, newTask.modalId);

        //  getting open section reference
        let open = document.getElementById("open");

        //  creating task container div
        let task = document.createElement("div");

        //  span containing task name
        let taskName = document.createElement("span");

        //  div containing buttons
        let buttonDiv = document.createElement("div");

        //  button to open description modal
        let descButton = document.createElement("button");
        descButton.innerHTML = "Task Description";

        //  creating attributes for new elements
        let task_attributes = {
            class: "task",
            draggable: "true",
            ondragstart: "dragStart(event)",
            id: "generateId()",
            ondragover: "",
            ondragleave: "",
        };
        let taskName_attributes = { class: "taskName" };
        let buttonDiv_attributes = { class: "button-div", id: "buttonDiv" };
        let descButton_attributes = {
            class: "desc-button",
            id: "descButton",
            onclick: "taskDesc(newTask.modalId)",
        };

        //  setting attributes
        setAttributes(task, task_attributes);
        setAttributes(taskName, taskName_attributes);
        setAttributes(buttonDiv, buttonDiv_attributes);
        setAttributes(descButton, descButton_attributes);

        //  appending new elements to open
        taskName.appendChild(document.createTextNode(input));
        buttonDiv.appendChild(descButton);
        task.appendChild(taskName);
        task.appendChild(buttonDiv);
        open.appendChild(task);

        //  creating modal
        let modal = document.createElement("div");
        let modalContent = document.createElement("div");
        let taskHeadDiv = document.createElement("div");
        let taskDescDiv = document.createElement("div");
        let descControlDiv = document.createElement("div");
        let descSpan = document.createElement("span");
        // descSpan.innerHTML = input;
        let descTextArea = document.createElement("textarea");
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit Description";
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "Close";

        //  creating attributes for modal elements
        let modal_attributes = { class: "modal hide", id: newTask.modalId };
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
        let editButton_attributes = { class: "action-button" };
        let closeButton_attributes = {
            class: "cancel-button",
            onclick: "cancel(newTask.modalId)",
        };

        //  setting modal element attributes
        setAttributes(modal, modal_attributes);
        setAttributes(modalContent, modalContent_attributes);
        setAttributes(taskHeadDiv, taskHeadDiv_attributes);
        setAttributes(taskDescDiv, taskDescDiv_attributes);
        setAttributes(descControlDiv, descControlDiv_attributes);
        setAttributes(descSpan, descSpan_attributes);
        setAttributes(descTextArea, descTextArea_attributes);
        setAttributes(editButton, editButton_attributes);
        setAttributes(closeButton, closeButton_attributes);

        //  appending modal
        let container = document.getElementById("container");
        taskHeadDiv.appendChild(descSpan);
        taskDescDiv.appendChild(descTextArea);
        descControlDiv.appendChild(editButton);
        descControlDiv.appendChild(closeButton);
        modalContent.appendChild(taskHeadDiv);
        modalContent.appendChild(taskDescDiv);
        modalContent.appendChild(descControlDiv);
        modal.appendChild(modalContent);
        container.appendChild(modal);

        modal.classList.add("hide");
    } else {
        alert("Input Task Name to continue");
    }
}

//  task description button function
function taskDesc(modalId) {
    modalId.classList.remove("hide");
}

//  modal close button function
function cancel(ref) {
    ref.parentNode.parentNode.parentNode.classList.add("hide");
}

//  dragging functionality
//
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log("dragging started: " + event.target.id);
    event.target.classList.add("drag");
    // setTimeout(() => {
    //     event.target.classList.add("hide");
    // }, 1);
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
    // task.classList.remove("hide");
    task.classList.remove("drag");
    event.dataTransfer.clearData();
}
