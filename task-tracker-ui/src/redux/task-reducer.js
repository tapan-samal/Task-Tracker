const taskReducer = (
  state = {
    task: {
      pending: [],
      inProgress: [],
      completed: [],
      deployed: [],
      deferred: [],
    },
    originalTask: {},
    taskForm: {
      status: "pending",
      title: "",
      description: "",
      team: "",
      assignee: "",
      priority: "0"
    }
  },
  action
) => {
  switch (action.type) {
    case "GET_ALL_TASKS_PENDING":
      console.log("Action::Pending", action.payload);
      return {
        ...state,
      };
    case "GET_ALL_TASKS_FULFILLED":
      return {
        ...state,
        task: formatData(action.payload.data),
        originalTask: formatData(action.payload.data)
      };
    case "GET_ALL_TASKS_REJECTED":
      return {
        ...state,
        task: formatData(action.payload),
        originalTask: formatData(action.payload)
      };
    case "UPDATE_CLICKED_TASK":
      return {
        ...state,
        taskForm: action.payload
      };

    case "DELETE_TASK_BY_ID": 
      return{
        ...state,
        taskForm: action.payload
      };

    case "UPDATE_FILTERED_TASK":
      return {
        ...state,
        task: action.payload
      };

    default:
      return state;
  }
};

const formatData = (data) => {
  let task = { pending: [], inProgress: [], completed: [], deployed: [], deferred: [] }
  
  data.map((item) => {
    console.log("Item::", item);
    task = { ...task, [item.status]: [...task[item.status], item] };
  });
  return task;
};

export default taskReducer;
