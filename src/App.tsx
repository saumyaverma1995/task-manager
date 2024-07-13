import { useState } from "react";
import "./App.css";
import Header from "./common/Header/Header";
import TaskManagerCard from "./common/TaskManagerCard/TaskManagerCard";
import {
  ITaskInfo,
  Priority,
} from "./common/TaskManagerCard/TaskManagerCard.interface";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";

function App() {
  const [taskQueue, setTaskQueue] = useState<Array<ITaskInfo>>(() => {
    const localData = localStorage.getItem("taskQueue");
    return localData !== null ? JSON.parse(localData) : [];
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [titleVal, setTitleVal] = useState<string>("");
  const [descVal, setDescVal] = useState<string>("");
  const addTaskHandler = () => {
    setIsOpen(!isOpen);
  };
  const onDeleteHandler = (taskInfo: ITaskInfo) => {
    const newTasks = taskQueue.filter((task) => task.id !== taskInfo.id);
    const idx = taskQueue.findIndex((e) => (e.id = taskInfo.id));
    const localData = localStorage.getItem("taskQueue");
    setTaskQueue([...newTasks]);
  };
  const editSavedHandler = (editedTaskId: string, newTaskInfo: ITaskInfo) => {
    const newData = [...taskQueue];
    const idx = taskQueue.findIndex((e) => (e.id = editedTaskId));
    newData.splice(idx, 1, newTaskInfo);
    const localData = localStorage.getItem("taskQueue");
    if (localData) {
      const parsedData = JSON.parse(localData);
      parsedData.splice(idx, 1, newTaskInfo);
      localStorage.setItem("taskQueue", JSON.stringify(parsedData));
    }
    setTaskQueue([...newData]);
  };
  const onSaveHandler = () => {
    const newTask: ITaskInfo = {
      id: uuidv4(),
      title: titleVal,
      description: descVal,
      priority: Priority.LOW,
      timestamp: new Date(),
    };
    setTaskQueue((taskQueue) => [...taskQueue, newTask]);
    localStorage.setItem("taskQueue", JSON.stringify([...taskQueue, newTask]));
    setIsOpen(!isOpen);
  };
  const onChangeTitle = (e: any) => {
    setTitleVal(e.target.value);
  };
  const onChangeDesc = (e: any) => {
    setDescVal(e.target.value);
  };
  const onRequesClose = () => {
    setIsOpen(!isOpen);
    setTitleVal("");
    setDescVal("");
  };
  return (
    <div className="application-wrapper">
      <Header title="Task Manager Application"></Header>
      <div className="button-wrapper">
        <button onClick={addTaskHandler}>Add task</button>
      </div>
      {taskQueue.length > 0 ? (
        <div className="tasks-wrapper">
          {taskQueue.map((task) => (
            <TaskManagerCard
              onSaveHandler={editSavedHandler}
              onDeleteHandler={onDeleteHandler}
              taskInfo={{
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                timestamp: task.timestamp,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="no-tasks">No tasks added</div>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequesClose}
        className={{
          base: "modal-base",
          afterOpen: "modal-base_after-open",
          beforeClose: "modal-base_before-close",
        }}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-base_after-open",
          beforeClose: "overlay-base_before-close",
        }}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >
        <div className="editable-modal-wrapper">
          <div className="editable-modal-title">
            <input
              placeholder="Title"
              defaultValue={titleVal}
              onChange={onChangeTitle}
            ></input>
          </div>
          <div>
            <textarea
              placeholder="Enter Description"
              defaultValue={descVal}
              onChange={onChangeDesc}
            ></textarea>
          </div>
          <div>
            <button onClick={onSaveHandler}>Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
