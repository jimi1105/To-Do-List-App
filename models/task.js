const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title:{
    type : String,
    required: true,
    },
    body: {
    type: String,
    required: true,
    },
    user: [
        {
    type: mongoose. Types. ObjectId,
    ref: "User",
        },
    ],
    completed: { 
        type: Boolean, 
        default: false, 
    },

    },    {timestamps: true}
);

module.exports = mongoose.model("Task", taskSchema)