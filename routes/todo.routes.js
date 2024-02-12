import express from 'express';
import Todo from '../models/todo.model.js';

const router = express.Router();

// Create a new Todo item
router.post('/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
    });

    try {
        const savedTodo = await todo.save();
        res.status(201).send(savedTodo);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Read all Todo items
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send(todos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a Todo item
router.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(todo);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a Todo item
router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).send(todo);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
