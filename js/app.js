var toDoApp = toDoApp || {};

toDoApp.init = () => {
  toDoApp.declaration();
  toDoApp.paintNewListView();
};
toDoApp.declaration = () => {
  toDoApp.createInputField = document.getElementsByName("inputVal")[0];
  toDoApp.createTaskField = document.getElementsByName("taskExpiry")[0];
  toDoApp.toDoListDiv = document.querySelector(".todo-list");
  toDoApp.toDoListUlDiv = document.querySelector(".todo-list > ul");
  toDoApp.completeListDiv = document.querySelector(".complete-list");
  toDoApp.completeListUlDiv = document.querySelector(".complete-list > ul");
  toDoApp.taskList = [];
  toDoApp.toDoList = [];
  toDoApp.completList = [];
  toDoApp.dragEl = null;
};

toDoApp.paintCreationDiv = (labelHeader, buttonText) => {
  let createBtnEl = document.getElementsByName("create")[0];

  document.getElementsByName("labelHeader")[0].innerText = labelHeader;
  createBtnEl.innerText = buttonText;
  createBtnEl.addEventListener("click", toDoApp.createList);
};
toDoApp.createList = () => {
  let el = document.getElementsByName("listTitle");

  el[0].classList.contains("hide")
    ? toDoApp.createNewList()
    : toDoApp.createNewTask();
};
toDoApp.paintNewListView = () => {
  toDoApp.paintCreationDiv("Create new List", "Create List");
};
toDoApp.createNewList = () => {
  let val = toDoApp.createInputField.value;

  val != "" ? toDoApp.displayTitle(val) : "";
};
toDoApp.displayTitle = val => {
  let el = document.getElementsByName("listTitle");

  el[0].children[0].innerText = val;
  el[0].classList.remove("hide");
  toDoApp.createTaskField.classList.remove("hide");
  toDoApp.completeListDiv.classList.remove("hide");
  toDoApp.toDoListDiv.classList.remove("hide");

  toDoApp.populateNewTaskView();
};
toDoApp.clearInputField = () => {
  toDoApp.createInputField.value = "";
  toDoApp.createTaskField.value = "";
};
toDoApp.populateNewTaskView = () => {
  toDoApp.clearInputField();

  toDoApp.paintCreationDiv("Create new task", "Add");
};
toDoApp.clearChildToDoDiv = parentDiv => {
  while (parentDiv.childElementCount != 0) {
    parentDiv.removeChild(parentDiv.children[0]);
  }
};
toDoApp.createNewTask = () => {
  const toDoList = toDoApp.toDoListUlDiv;
  const taskExpiryVal = toDoApp.createTaskField;
  let val = toDoApp.createInputField.value;

  toDoApp.clearChildToDoDiv(toDoList);

  if (val != "" && taskExpiryVal.value != "") {
    toDoApp.toDoList.push({
      title: val,
      status: "todo",
      expiry: taskExpiryVal.value
    });

    toDoApp.publishTaskList(toDoApp.toDoList, toDoList, false);

    toDoApp.clearInputField();
  }
};
toDoApp.sortList = (list) => {
    list.sort(el => {

    });
} 
toDoApp.bindEvents = el => {
  const checkBox = el.querySelector("input[type=checkbox]");

  checkBox.addEventListener("change", () => {
    toDoApp.taskCompleted(el);
  });
};
toDoApp.taskCompleted = el => {
  const completeList = toDoApp.completeListUlDiv;
  const toDoLIstDiv = toDoApp.toDoListUlDiv;
  const index = el.getAttribute("index");
  const completedObject = toDoApp.toDoList[index];

  toDoApp.toDoList.splice(index, 1);

  completedObject.status = "completed";
  toDoApp.completList.push(completedObject);

  toDoApp.clearChildToDoDiv(completeList);
  toDoApp.clearChildToDoDiv(toDoLIstDiv);
  toDoApp.publishTaskList(toDoApp.completList, completeList, true);
  toDoApp.publishTaskList(toDoApp.toDoList, toDoLIstDiv, false);
};
toDoApp.filterArrayBasedOnKey = (key, val) => {
  const toDoObject = [...toDoApp.taskList];

  return toDoObject.filter(el => el[key].toLowerCase() === val.toLowerCase());
};
toDoApp.publishTaskList = (taskObject, parentDiv, checkBoxHidden) => {
  const tree = document.createDocumentFragment();
  taskObject.forEach((el, i) => {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const taskLabel = document.createElement("label");

    const taskExpiry = toDoApp.createTaskField.value;

    listItem.draggable = !checkBoxHidden;
    listItem.setAttribute("index", i);
    label.innerText = el.title;
    checkBox.type = "checkbox";
    checkBox.hidden = checkBoxHidden;
    taskLabel.innerText = el.expiry;
    const timeDiff = toDoApp.calculateTaskExpiry(el);
    const classList = !checkBoxHidden ? 86400000 > timeDiff && timeDiff > 0 ? "attention-rquired" : timeDiff < 0 ? "expired" : "" : "completed";
    classList != "" ? listItem.classList.add(classList) : '';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(taskLabel);

    toDoApp.addListenersItems(listItem);
    tree.appendChild(listItem);
  });

  parentDiv.appendChild(tree);
};
toDoApp.calculateTaskExpiry = (item) => {
    const expiryDt = new Date(item.expiry);
    const todayDate = new Date();

    return expiryDt.getTime() - todayDate.getTime();
}
toDoApp.addListenersItems = el => {
  const checkBox = el.querySelector("input[type=checkbox]");

  el.addEventListener("dragstart", toDoApp.handleDragStart, false);
  el.addEventListener("dragenter", toDoApp.handleDragEnter, false);
  el.addEventListener("dragover", toDoApp.handleDragOver, false);
  el.addEventListener("dragleave", toDoApp.handleDragLeave, false);
  el.addEventListener("drop", toDoApp.handleDrop, false);
  el.addEventListener("dragend", toDoApp.handleDragEnd, false);
  checkBox.addEventListener("change", () => {
    toDoApp.taskCompleted(el);
  });
};
toDoApp.handleDragStart = e => {
  toDoApp.dragEl = e.target;
};
toDoApp.handleDragOver = e => {
  if (e.preventDefault) {
    e.preventDefault();
  }

  return false;
};
toDoApp.handleDragEnter = e => {
  e.preventDefault();
};
toDoApp.handleDragLeave = e => {};
toDoApp.handleDrop = e => {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (toDoApp.dragEl != null && toDoApp.dragEl != e.target) {
    const draggedIndex = toDoApp.dragEl.getAttribute("index");
    const draggedObj = toDoApp.toDoList[draggedIndex];
    const droppedIndex = e.target.getAttribute("index")
      ? e.target.getAttribute("index")
      : e.target.parentElement.getAttribute("index");

    toDoApp.toDoList.splice(draggedIndex, 1);
    toDoApp.toDoList.splice(droppedIndex, 0, draggedObj);
    toDoApp.clearChildToDoDiv(toDoApp.toDoListUlDiv);
    toDoApp.publishTaskList(toDoApp.toDoList, toDoApp.toDoListUlDiv, false);
    toDoApp.dragEl = null;
  }
  return false;
};
toDoApp.handleDragEnd = e => {
  toDoApp.dragEl = null;
};
