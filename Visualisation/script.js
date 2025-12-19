class Task {
    constructor(id, title, priority, deadline, timeRequired) {
        this.id = id;
        this.title = title;
        this.priority = Number(priority);
        this.deadline = new Date(deadline);
        this.timeRequired = Number(timeRequired);
        this.completed = false;
    }
}


class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.nextId = 1;
    }

    addTask(title, priority, deadline, timeRequired) {
        let id = this.nextId++;
        let task = new Task(id, title, priority, deadline, timeRequired);
        this.tasks.set(id, task);
        return id;
    }

    getTask(id) {
        return this.tasks.get(id) || null;
    }

    completeTask(id) {
        let task = this.getTask(id);
        if (task) task.completed = true;
    }
}

class Scheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        if (task && !task.completed) this.tasks.push(task);
    }

    sortTasks() {
        this.tasks.sort((a, b) => {
            if (a.deadline - b.deadline !== 0) return a.deadline - b.deadline;
            if (a.priority - b.priority !== 0) return a.priority - b.priority;
            return a.timeRequired - b.timeRequired;
        });
    }
}


let manager = new TaskManager();
let scheduler = new Scheduler();
function addTask() {
    let title = document.getElementById("title").value;
    let priority = document.getElementById("priority").value;
    let deadlineInput = document.getElementById("deadline").value;
    let time = Number(document.getElementById("time").value);

    if (!title || !deadlineInput || !time) {
        alert("Fill all fields!");
        return;
    }

    let deadline = new Date(deadlineInput);
    if (isNaN(deadline.getTime())) {
        alert("Invalid deadline!");
        return;
    }

    
    let tempTasks = [];
    for (let t of scheduler.tasks) tempTasks.push(t);
    let newTask = new Task(0, title, priority, deadline, time);
    tempTasks.push(newTask);

    tempTasks.sort((a, b) => {
        if (a.deadline - b.deadline !== 0) return a.deadline - b.deadline;
        if (a.priority - b.priority !== 0) return a.priority - b.priority;
        return a.timeRequired - b.timeRequired;
    });

    let feasible = false;
    let now = new Date();

    while (!feasible) {
        feasible = true;
        let cumulativeTime = 0;
        for (let t of tempTasks) {
            if (t.completed) continue;
            let available = (t.deadline - now) / (1000 * 60 * 60);
            cumulativeTime += t.timeRequired;

            if (cumulativeTime > available) {
                let newTime = prompt(
                    `Task "${t.title}" cannot be completed on time!\n` +
                    `Available hours: ${available.toFixed(2)}\n` +
                    `Cumulative time needed: ${cumulativeTime.toFixed(2)}\n` +
                    "Enter new time required (hours) or Cancel to skip:"
                );
                if (newTime === null) return;

                t.timeRequired = Number(newTime);
                if (isNaN(t.timeRequired) || t.timeRequired <= 0) {
                    alert("Invalid time. Task not added.");
                    return;
                }

                
                if (t === newTask) time = t.timeRequired;

                feasible = false;
                break; 
            }
        }
    }


    let id = manager.addTask(title, priority, deadline, time);
    let task = manager.getTask(id);
    scheduler.addTask(task);
    scheduler.sortTasks();
    showTasks();
    alert("Task added: " + title);
}

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    for (let task of scheduler.tasks) {
        if (task.completed) continue;

        let li = document.createElement("li");
        li.textContent = `${task.title} | P:${task.priority} | D:${task.deadline.toLocaleString()} | T:${task.timeRequired}`;

        let btn = document.createElement("button");
        btn.textContent = "Done";
        btn.onclick = () => completeTask(task.id);

        li.appendChild(document.createTextNode(" "));
        li.appendChild(btn);
        list.appendChild(li);
    }
}

function completeTask(id) {
    manager.completeTask(id);
    showTasks();
}
