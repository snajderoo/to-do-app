let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    return todos;
}

function addTodo(title, description) {
    todos.push({
        id: Date.now(),
        title,
        description,
        status: 'todo',
        createdAt: new Date().toISOString()
    });
    saveTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
}

function toggleTodoStatus(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.status = todo.status === 'todo' ? 'done' : 'todo';
        saveTodos();
    }
}

function updateTodo(id, title, description) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = title;
        todo.description = description;
        saveTodos();
    }
}
