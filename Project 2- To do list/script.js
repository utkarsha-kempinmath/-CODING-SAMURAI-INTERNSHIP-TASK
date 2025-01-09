document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task))
        updateTasksList()
        updateStats()
    }
})


let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const addTask = () => {
    const inputTask = document.getElementById("inputTask");
    const text = inputTask.value.trim();

    if (text) {
        tasks.push({ text: text, complete: false });
        inputTask.value = "";

        updateTasksList();
        updateStats();
        saveTasks();
    };
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">

        <div class="task ${task.complete ? "completed" : ""}">

        <input type="checkbox" class="checkbox" ${task.complete ? "checked" : ""} />

        <p class= "para">${task.text}</p>

        </div>

        <div class="icons">

        <img src="Edit_light.png" onClick="editTask(${index})" />

        <img src="Close_round_light.png" onClick="deleteTask(${index})" />

        </div>

        </div>
        `;
        const checkbox = listItem.querySelector(".checkbox");
        listItem.addEventListener("change", () => toggleTaskComplete(index));

        taskList.appendChild(listItem);

    });
};

const toggleTaskComplete = (index) => {
    tasks[index].complete = !tasks[index].complete;
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTask = tasks.filter(task => task.complete).length
    const totalTask = tasks.length
    const progress = totalTask > 0 ? (completeTask / totalTask) * 100 : 0;

    const progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`

    document.getElementById('nos').innerText = `${completeTask} / ${totalTask}`
    if (tasks.length && completeTask === totalTask) {
        cofeti()
    }
}

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault()

    addTask()
});

const cofeti = () => {
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}