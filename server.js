const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const User = require('./model/userModel');
const Task = require('./model/taskModel');

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DB_URI;

mongoose.connect(MONGO_URI)
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.log(err));

app.listen (PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: "User fields are empty" });
    }

    const newUser = new User({ name, email });
    
    newUser.save()
           .then(() => res.status(201).json({ success: true, message: "User created successfully" }))
           .catch(err => res.status(500).json({ success: false, message: "Internal server error", error: err }));
});

app.post('/tasks', (req,res) => {
    const { title, description, dueDate, status, userId } = req.body;

    if (!title || !description == null || !dueDate == null) {
        return res.status(400).json({ success: false, message: "Task fields are empty"})
    }

    const newTask = new Task({ title, description, dueDate, status, userId });

    newTask.save()
              .then(() => res.status(201).json({ success: true, message: "Task created successfully"}))
              .catch(err => res.status(500).json({ success: false, message: "Internal Server error", error: err }))
})