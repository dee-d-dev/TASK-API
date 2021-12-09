const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("all tasks");
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};
const getSingleTask = (req, res) => {
  res.send({ id: req.params.id });
};
const updateTask = (req, res) => {
  res.send("update task");
};
const deleteTask = (req, res) => {
  res.send(req.params.id);
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
