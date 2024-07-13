import React, { useState } from "react";
import { ITaskManagerCard } from "./TaskManagerCard.interface";
import { v4 as uuidv4 } from "uuid";

function TaskManagerCard(props: ITaskManagerCard) {
  const { taskInfo, onSaveHandler, onDeleteHandler } = props;
  console.log({taskInfo})
  const [disable, setIsDisable] = useState<boolean>(true);
  const [titleVal, setTitleVal] = useState<string>("");
  const [descVal, setDescVal] = useState<string>("");
  const [prio, setPrio] = useState<number>(0);
  const onEdit = () => {
    setIsDisable(false);
  };
  const onSave = () => {
    onSaveHandler(taskInfo.id, {
      id: uuidv4(),
      title: titleVal,
      description: descVal,
      priority: prio,
      timestamp: new Date(),
    });
    setIsDisable(true);
  };
  const onChangeTitle = (e: any) => {
    setTitleVal(e.target.value);
  };
  const onChangeDesc = (e: any) => {
    setDescVal(e.target.value);
  };
  const onPriorityChange = (e: any) => {
    setPrio(e.target.value);
  };
  return (
    <div className="taskManagerCardWrapper">
      <div className="card-title">
        {disable ? (
          <div className="card-title-wrapper">
            <div>
              <b>{taskInfo.title}</b>
            </div>
            <div>Priority: {taskInfo.priority}</div>
          </div>
        ) : (
          <div className="card-title-wrapper">
            <input
              className="title-edit-card"
              defaultValue={taskInfo.title}
              onChange={onChangeTitle}
            ></input>
            <input
              className="desc-edit-card"
              defaultValue={taskInfo.priority}
              onChange={onPriorityChange}
            ></input>
          </div>
        )}
      </div>
      <div className="textarea-wrapper">
        <textarea
          onChange={onChangeDesc}
          defaultValue={taskInfo.description}
          disabled={disable}
          className="card-description"
        />
      </div>
      <div className="card-buttons">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onSave}>Save</button>
        <button onClick={() => onDeleteHandler(taskInfo)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskManagerCard;
