const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const API_URL = 'http://localhost:3000/todo';


async function fetchToDo(){
    const response = await fetch(API_URL);
    const todo = await response.json();
    todoList.innerHTML = '';
    todo.forEach(todo=> renderTodo(todo));
}

function renderTodo(todo){
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${todo.task}</span>
    <div>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  `;
  todoList.appendChild(li);
}

fetchToDo();