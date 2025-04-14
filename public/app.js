const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

const API_URL = '/todos';  // Relative URL since the API is on the same server

// Fetch and display all todos (GET)
async function fetchTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  todoList.innerHTML = '';
  todos.forEach(todo => renderTodo(todo));
}

// Render a single todo in the DOM
function renderTodo(todo) {
  const li = document.createElement('li');
  li.setAttribute('data-id', todo.id);
  li.innerHTML = `
    <span>${todo.task}</span>
    <div>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  `;
  todoList.appendChild(li);
}


// Handle form submission to add a new todo (POST)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Form submitted'); // Check if this prints in the console
  
  const newTask = input.value.trim();
  if (newTask === '') return;

  console.log('New task:', newTask); // Verify input content

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: newTask,
        completed: false
      })
    });

    if (!response.ok) {
      console.error('Error posting todo:', response.statusText);
      return;
    }

    const addedTodo = await response.json();
    console.log('Added Todo:', addedTodo);
    renderTodo(addedTodo); 
    input.value = '';  // Clear input after submission
  } catch (err) {
    console.error('Fetch error:', err);
  }
});


// Delete a todo (DELETE)
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  // Refresh todo list after deletion
  fetchTodos();
}

// Load todos on initial page load
fetchTodos();
