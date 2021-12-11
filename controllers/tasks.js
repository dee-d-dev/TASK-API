const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find();
  res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOne({ _id: TaskID });

  if (!task) {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
    return res.status(404).json({ msg: `no task with ID: ${TaskID}` });
  }
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const data = req.body;
  const updatedTask = await Task.findOneAndUpdate({ _id: taskID }, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    res.status(500).json(`Can't find a task with the id: ${taskID}`);
  }

  res.status(200).json({ updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskID });

  if (!task) {
    res.status(404).json({ msg: `cannot find task with id : ${TaskID}` });
  }

  res.status(200).json({ task });

  res.send(req.params.id);
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
