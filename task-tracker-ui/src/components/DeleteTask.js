import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { idb } from "../idb";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskById, getAllTasks } from "../redux/task-action";

function DeleteTask(props) {
  const dispatch = useDispatch();
  const taskStore = useSelector((state) => state.taskReducer);
  const [taskForm, setTaskForm] = useState(taskStore.taskForm);

  const handleModalClose = () => {
    props.show(false);
  };

  const handleDeleteTask = () => {
    if (taskForm._id) {
      dispatch(
        deleteTaskById({
          ...taskForm,
          [taskForm._id]: {},
        })
      );
    }
    handleModalClose();
    window.location.reload();
  };
  console.log("task>>>>>", taskStore);
  return (
    <div>
      <Modal isOpen={true} toggle={handleModalClose} unmountOnClose={true}>
        <ModalHeader toggle={handleModalClose}>Delete Task</ModalHeader>
        <ModalBody>Do you want to delete this task?</ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={handleDeleteTask}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={handleModalClose}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteTask;
