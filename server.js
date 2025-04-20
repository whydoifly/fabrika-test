const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks = [];

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update task completion status
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = completed;
  res.json(task);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
