const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    required: [true, "must provide a task name"],
    trim: true,
    type: String,
  },
  completed: { type: Boolean, default: false },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
