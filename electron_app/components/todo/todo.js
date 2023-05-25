function loadTodos(todoList, addTodoToList) {
  var todos = JSON.parse(localStorage.getItem('todos')) || [];
  // Sort todos so that active todos are at the top
  todos.sort(function(a, b) {
    return b.active - a.active;
  });
  todos.forEach(function(todo) {
    addTodoToList({ text: todo.text, active: todo.active }, todoList);
  });
}

function saveTodos(todoList) {
  var todos = Array.from(todoList.children).map(function(li) {
    return {
      text: li.querySelector('span').textContent,
      active: li.querySelector('input[type="checkbox"]').checked
    };
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoToList(todo, todoList) {
  var listItem = document.createElement('li');

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.active || false; // If todo is a string, this will be false
  checkbox.addEventListener('change', function() {
    listItem.style.border = this.checked ? '2px solid gold' : '';
    if (this.checked) {
      todoList.prepend(listItem);
    } else {
      todoList.appendChild(listItem);
    }
    saveTodos(todoList);
  });
  listItem.appendChild(checkbox);

  var todoText = document.createElement('span');
  todoText.textContent = typeof todo === 'string' ? todo : todo.text; // If todo is a string, use it directly
  listItem.appendChild(todoText);

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', function() {
    todoList.removeChild(listItem);
    saveTodos(todoList);
  });

  listItem.appendChild(deleteButton);

  if (checkbox.checked) {
    todoList.prepend(listItem);
  } else {
    todoList.appendChild(listItem);
  }
}

module.exports = {
  loadTodos: loadTodos,
  saveTodos: saveTodos,
  addTodoToList: addTodoToList
};
