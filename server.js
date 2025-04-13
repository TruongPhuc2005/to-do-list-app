const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());


let todo = [
    {id: 1, task: 'Buy groceries', completed: false},
    {id: 2, task: 'Learn Express.js', completed: false}
];

// GET