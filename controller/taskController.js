const Product = require('../model/taskModel');

exports.createProduct = (req, res) => {
    const { title, description, dueDate, status, userId } = req.body;
    
        if (!title || !description == null || !dueDate == null) {
            return res.status(400).json({ success: false, message: "Task fields are empty"})
        }
    
        const newTask = new Task({ title, description, dueDate, status, userId });
    
        newTask.save()
                  .then(() => res.status(201).json({ success: true, message: "Task created successfully"}))
                  .catch(err => res.status(500).json({ success: false, message: "Internal Server error", error: err }))

}