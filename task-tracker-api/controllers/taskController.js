const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

//@description: Get all Tasks
//@route: GET /api/tasks
//@access: Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.status(200).json(tasks);
});

//@description: Create a new Task
//@route: POST /api/task
//@access: Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, team, assignee, priority, status } = req.body;
  if (!title || !description || !team || !assignee || !priority || !status) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }
  const task = await Task.create({
    title,
    description,
    team,
    assignee,
    priority,
    status,
    user_id: req.user.id,
  });
  res.status(201).json(task);
});

//@description: Get a task
//@route: GET /api/tasks/:id
//@access: Private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(task);
});

//@description: Update a task
//@route: PUT /api/tasks/:id
//@access: Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User won't have permission to update other user conatcts!"
    );
  }

  const updateTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateTask);
});

//@description: Delete a task
//@route: DELETE /api/tasks/:id
//@access: Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete other user conatcts!"
    );
  }

  await Task.deleteOne({ _id: req.params.id });
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
