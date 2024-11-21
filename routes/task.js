const router = require("express").Router();
const User = require("../models/user");
const Task = require("../models/task");

router.post("/addTask", async (req, res) => {
    try {
    const { title, body, email } = req.body;
    const userData = await User.findOne({ email });
    if (userData){
    const task = new Task({ title, body, user: userData });
    await task.save().then(() => res.status(200).json({ task }));
    userData.task.push(task);
    userData.save();
    }
} 
    catch (error) {
    console.log(error);
    }
    }
);

router.put("/updateTask/:id", async (req, res) => {
    try {
    const { title, body, email } = req.body;
    const userData = await User.findOne({ email });
    if (userData) {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            { title, body },
            { new: true } // This option ensures the updated task is returned
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Return the updated task or a success message
        res.status(200).json({ message: "Task Updated", task });
    }
    }
    catch (error) {
    console.log(error);
    }
}); 

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { email } = req.body;

        // First, find and update the user to pull the task ID from the task array
        const userData = await User.findOneAndUpdate(
            { email },
            { $pull: { task: req.params.id } },
            { new: true } // This option returns the updated document (optional)
        );

        // If userData is null, return an error
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Then delete the task from the Task collection
        const taskDeleted = await Task.findByIdAndDelete(req.params.id);

        // Check if task was deleted successfully
        if (!taskDeleted) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Return success message if both operations were successful
        res.status(200).json({ message: "Task Deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/viewTasks/:id", async (req, res) => {
    const user = await Task.find({ user: req.params.id }) .sort({ createdAt: -1 });
    if (user.length !== 0) {
    res.status(200).json({ user: user});
    } else {
    res.status(200).json({ message: "No Tasks" });
    }
    });

router.put("/toggleTaskCompleted/:id", async (req, res) => {
    try {
    // Find the task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    // Toggle the 'completed' field
    task.completed = !task.completed;

    // Save the updated task
    await task.save();

    res.status(200).json({ message: `Task marked as ${task.completed ? 'completed' : 'uncompleted'}`, task });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    }
});
module. exports = router;