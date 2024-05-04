import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  Col,
} from "reactstrap";
import { idb } from "../idb";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, saveOrUpdateTask } from "../redux/task-action";
import statuses from "../data/status.json";
import { headerDetailsByStatus } from "../utils/common-utility";

function AddEditTask(props) {
  const dispatch = useDispatch();
  const taskStore = useSelector((state) => state.taskReducer);
  const [taskForm, setTaskForm] = useState(taskStore.taskForm);

  const handleModalClose = () => {
    props.show(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    console.log("taskForm>>>>>", taskForm);
    if (taskForm._id) {
      dispatch(
        saveOrUpdateTask({
          ...taskForm,
          endDate:
            taskForm.status === "completed" ||
            taskForm.status === "deployed" ||
            taskForm.status === "deferred"
              ? new Date()
              : null,
        })
      );
    } else {
      dispatch(saveOrUpdateTask(taskForm));
    }

    handleModalClose();
    window.location.reload();
  };
  console.log("Taskform>>>", taskForm)

  return (
    <div>
      <Modal
        isOpen={true}
        toggle={handleModalClose}
        unmountOnClose={true}
        size="lg"
      >
        <ModalHeader toggle={handleModalClose}>
          {taskForm._id ? "Edit Task" : "Create New Task"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label sm={2}>Title</Label>
              <Col sm={10}>
                <Input
                  bsSize="sm"
                  name="title"
                  type="text"
                  value={taskForm.title}
                  onChange={handleInputChange}
                  disabled={taskForm._id}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Description:</Label>
              <Col sm={10}>
                <Input
                  bsSize="sm"
                  name="description"
                  type="textarea"
                  value={taskForm.description}
                  onChange={handleInputChange}
                  disabled={taskForm._id}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Team:</Label>
              <Col sm={10}>
                <Input
                  bsSize="sm"
                  name="team"
                  type="text"
                  value={taskForm.team}
                  onChange={handleInputChange}
                  disabled={taskForm._id}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Assignee:</Label>
              <Col sm={10}>
                <Input
                  bsSize="sm"
                  name="assignee"
                  type="text"
                  value={taskForm.assignee}
                  onChange={handleInputChange}
                  disabled={taskForm._id}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Priority:</Label>
              <Col sm={3}>
                <Input
                  bsSize="sm"
                  name="priority"
                  type="select"
                  value={taskForm.priority}
                  onChange={handleInputChange}
                >
                  <option value="0">P0</option>
                  <option value="1">P1</option>
                  <option value="2">P2</option>
                </Input>
              </Col>
              <Label sm={2}>Status:</Label>
              <Col sm={3}>
                <Input
                  bsSize="sm"
                  name="status"
                  type="select"
                  value={taskForm.status}
                  onChange={handleInputChange}
                  disabled={!taskForm._id}
                >
                  {statuses.map((status) => (
                    <option value={status}>
                      {headerDetailsByStatus(status).text}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={handleTaskSubmit}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddEditTask;
