import { client } from "../utils/client";

export const getAllTasks = () => {
  return {
    type: "GET_ALL_TASKS",
    payload: client.get("/api/tasks"),
  };
};

export const saveOrUpdateTask = (task) => {
  console.log("UpdatedTask>>>", task._id)
  return {
    type: "SAVE_OR_UPDATE_TASK",
    payload: task._id ? client.put(`/api/tasks/${task._id}`, task) : client.post("/api/tasks", task)
  };
};

export const updateClickedTask = (data) => {
  console.log("Data>>>>", data)
  return {
    type: "UPDATE_CLICKED_TASK",
    payload: data,
  };
};

export const deleteTaskById = (task) => {
  return{
    type: "DELETE_TASK_BY_ID",
    payload: task._id ? client.delete(`/api/tasks/${task._id}`, task) : client.post("/api/tasks", task)
  };
};

export const updateFilteredTask = (data) => {
  return {
    type: "UPDATE_FILTERED_TASK",
    payload: data
  };
};

