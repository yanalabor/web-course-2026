let tasks = [];
let currentFilter = 'all';
let idCounter = 1;

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');
const filterButtons = document.querySelectorAll('.filter-btn');

function addTask(text) {
    tasks.push({ id: idCounter++, text, completed: false });
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
}

function getFilteredTasks() {
    if (currentFilter === 'active') return tasks.filter(task => !task.completed);
    if (currentFilter === 'completed') return tasks.filter(task => task.completed);
    return tasks;
}

function render() {
    list.innerHTML = '';

    getFilteredTasks().forEach(task => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (task.completed ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
            render();
        });

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '✕';
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
            render();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    const remaining = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    counter.textContent = `Осталось: ${remaining}, Выполнено: ${completed}`;
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();

    if (!text) {
        input.classList.add('input-error');
        setTimeout(() => input.classList.remove('input-error'), 300);
        return;
    }

    addTask(text);
    input.value = '';
    render();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

render();
