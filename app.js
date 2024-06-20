const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let todos = [];


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/todo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'todo.html'));
});


app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submitted.html'));
});

app.get('/todo/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewtodo.html'));
});


app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todo', (req, res) => {
    const { id, title, description } = req.body;
    const newTodo = { id, title, description };
    todos.push(newTodo);
    res.redirect('/submitted');
});


app.get('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});




app.put('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos[todoIndex] = { ...todos[todoIndex], title, description };
    res.json(todos[todoIndex]);
});


app.delete('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted' });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
