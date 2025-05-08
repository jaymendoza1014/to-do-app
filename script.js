let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => renderTask(task));
    }

    taskCount();

}

function renderTask(task) {
    const itemList = document.getElementById('list');
    const newItem = document.createElement('li');
    newItem.textContent = task.text;
    const del = document.createElement('img');
    del.className = 'delete-img'
    del.src = 'delete.png'
    newItem.appendChild(del)

    newItem.classList.add('item-style');
    if (task.completed) {
        newItem.classList.add('completed');
    }

    newItem.addEventListener('click', function () {
        task.completed = !task.completed;
        newItem.classList.toggle('completed');
        saveTasks();
        taskCount();
    });

    del.addEventListener('click', function(event) {
        event.stopPropagation();
        // removes item from the UI
        itemList.removeChild(newItem)
        // remove item from tasks array 
        tasks.splice(tasks.indexOf(task), 1)
        saveTasks();
        taskCount();
    });



    itemList.appendChild(newItem);

}

function addTodo() {
    const inputItem = document.getElementById("new-input");
    const value = inputItem.value.trim();

    if (value === "") {
        alert("Please enter a valid task.");
        return;
    }

    const newTask = { text: value, completed: false };
    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    taskCount();

    inputItem.value = "";
}

function clearList() {
    document.getElementById('list').innerHTML = '';
    tasks = [];
    localStorage.removeItem('tasks');
}


    

loadTasks(); // Load existing tasks on page load


function taskCount() {

    

    let remTask = document.getElementById('count');
    let completedTask = tasks.filter(task => !task.completed).length;


    remTask.innerHTML = completedTask
}