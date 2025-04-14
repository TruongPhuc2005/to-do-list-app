const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello from the root route');
})

// GET
app.get('/todo', (req, res) => {
    res.json(todo);
})

let todo = [
  {id: 1, task: 'Buy groceries', completed: false},
  {id: 2, task: 'Learn Express.js', completed: false}
];

/*
app.post('/todos', (req, res) => {
  const { task, completed = false } = req.body;
  // Generate an ID based on the last element or 1 if empty
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const newTodo = { id: newId, task, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
*/ 

app.post('/todo', (req, res) => {
    const {task, completed = false} = req.body;
    const newId = todo.length > 0 ? todo[todo.length - 1].id + 1 : 1;
    const newTodo = {id: newId, task, completed};

    todo.push(newTodo); // create new task

    res.status(404).json(newTodo);
});

/**
 * app.post('/todo', (req, res) => {
 * const {task, completed=false} = req.body;
 * const newID = todo.length > 0 ? todo[todo.length - 1].id + 1 : 1;
 * const newTODO = {id: newID, task, completed};
 * 
 * todo.push(newTODO);
 * res.status(404).json(newTODO);
 * })
 */


/* 
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  
  if (todoIndex !== -1) {
    // Update the todo with new values
    todos[todoIndex] = { ...todos[todoIndex], task, completed };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});*/

app.put('/todo', (req, res)=>{
    const {id} = req.params;
    const {task, completed} = req.body;
    const todoIndex = todo.findIndex(todo => todo.id === parseInt(id));

    if(todoIndex !== -1){
        todo[todoIndex] = {...todo[todoIndex], task, completed};
        res.json(todo[todoIndex]);
    }
    else {
        res.status(404).json({error: 'Not found lol'});
    }
});

/*
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});*/

app.delete('/todo/:id', (req, res)=>{
  const {id} = req.params;
  const todoIndex = todo.findIndex(todo => todo.id === parseInt(id));
  if(todoIndex !== -1){
    const deleteTodo = todo.splice(todoIndex, 1);
    res.json(deleteTodo[0]);
  } else {
    res.status(404).json({error: 'Not found lolll'});
  }
})


app.listen(port, () => {
  console.log( `Server is running on https://localhost:${port}`);
});