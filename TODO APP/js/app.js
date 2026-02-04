const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const errorDiv = document.getElementById('error');
const list = document.getElementById('todo-list');

const dialog = document.getElementById('details-dialog');
const dialogTitle = document.getElementById('details-title');
const dialogDescription = document.getElementById('details-description');
const dialogDate = document.getElementById('details-date');
const dialogStatus = document.getElementById('details-status');
const closeDialogBtn = document.getElementById('close-dialog');

closeDialogBtn.addEventListener('click', () => dialog.close());

function renderTodos() {
    list.innerHTML = '';

    const todos = getTodos()
        .slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    todos.forEach(todo => {
        const li = document.createElement('li');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${todo.title} (${new Date(todo.createdAt).toLocaleString()})`;

        const statusBadge = document.createElement('span');
        statusBadge.classList.add('status', todo.status);
        statusBadge.textContent = todo.status.toUpperCase();

        titleSpan.appendChild(statusBadge);

        if (todo.status === 'done') {
            titleSpan.classList.add('done');
        }

        const actions = document.createElement('div');
        actions.className = 'actions';

        const statusBtn = document.createElement('button');
        statusBtn.textContent = todo.status === 'todo' ? 'Done' : 'Todo';
        statusBtn.addEventListener('click', () => {
            toggleTodoStatus(todo.id);
            renderTodos();
        });

        const detailsBtn = document.createElement('button');
        detailsBtn.textContent = 'Szczegóły';
        detailsBtn.addEventListener('click', () => showDetails(todo));

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edytuj';
        editBtn.addEventListener('click', () => editTodo(todo));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.addEventListener('click', () => {
         const confirmed = confirm('Na pewno chcesz usunąć to zadanie?');
            if (!confirmed) return;

            deleteTodo(todo.id);
            renderTodos();
        });

        actions.append(statusBtn, detailsBtn, editBtn, deleteBtn);
        li.append(titleSpan, actions);
        list.appendChild(li);
    });
}

function showDetails(todo) {
    dialogTitle.textContent = todo.title;
    dialogDescription.textContent = todo.description || 'Brak opisu';
    dialogDate.textContent = 'Data utworzenia: ' + new Date(todo.createdAt).toLocaleString();
    dialogStatus.textContent = 'Status: ' + todo.status;
    dialog.showModal();
}

function editTodo(todo) {
    const newTitle = prompt('Nowy tytuł', todo.title);
    if (newTitle === null) return;

    const newDescription = prompt('Nowy opis', todo.description);

    const error = validateTodo(newTitle, newDescription || '');
    if (error) {
        alert(error);
        return;
    }

    updateTodo(todo.id, newTitle, newDescription || '');
    renderTodos();
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const title = titleInput.value;
    const description = descriptionInput.value;

    const error = validateTodo(title, description);
    if (error) {
        errorDiv.textContent = error;
        return;
    }

    errorDiv.textContent = '';
    addTodo(title, description);
    form.reset();
    renderTodos();
});

renderTodos();
