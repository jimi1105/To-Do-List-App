const mongoose = require("mongoose");
const userSchema = new mongoose. Schema({
    email: {
    type: String,
    unique: true,
    required: true,
    },
    username: {
    type: String,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    },
    task: [
        {
    type: mongoose. Types. ObjectId,
    ref: "Task",
        },
    ],
});

module.exports = mongoose.model("User", userSchema)