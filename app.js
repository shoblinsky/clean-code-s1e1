var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.querySelector(".main__wrapper-btn");//first button
var incompleteTaskHolder=document.getElementById("incompleted-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    listItem.className="section__ul-li"
    label.innerText=taskString;
    label.className="li-task li-label";
    checkBox.type="checkbox";
    checkBox.className="li-checkbox"
    editInput.type="text";
    editInput.className="li-task li-input li__task-input";
    editButton.innerText="Edit";
    editButton.className="li-edit";
    deleteButton.className="li-delete";
    deleteButtonImg.className="li-delete-img"
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";

}

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;

    var editInput=listItem.querySelector(".li-input");
    var label=listItem.querySelector(".li-label");
    var editBtn=listItem.querySelector(".li-edit");
    var containsClass=listItem.classList.contains("editMode");
    if(containsClass){

        label.innerText=editInput.value;
        editBtn.innerText="Edit";
        editInput.classList.remove("li-edit-mode__task-input");
        label.classList.remove("li-edit-mode__task-label");
        editInput.classList.add("li__task-input");

    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
        editInput.classList.add("li-edit-mode__task-input");
        label.classList.add("li-edit-mode__task-label");
        editInput.classList.remove("li__task-input");
    }

    listItem.classList.toggle("editMode");
};


var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;

    ul.removeChild(listItem);

}


var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    var editInput = listItem.querySelector(".li-input");
    var label = listItem.querySelector(".li-label");
    editInput.classList.add("li-completed__task-input");
    label.classList.add("li-completed__task-label");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    var listItem=this.parentNode;
    var editInput = listItem.querySelector(".li-input");
    var label = listItem.querySelector(".li-label");
    editInput.classList.remove("li-completed__task-input");
    label.classList.remove("li-completed__task-label");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox=taskListItem.querySelector(".li-checkbox");
    var editButton=taskListItem.querySelector(".li-edit");
    var deleteButton=taskListItem.querySelector(".li-delete");

    editButton.addEventListener("click",editTask);
    deleteButton.addEventListener("click",deleteTask);
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){

    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
