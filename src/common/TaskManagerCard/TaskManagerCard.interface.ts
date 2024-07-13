export enum Priority {
  HIGH,
  MEDIUM,
  LOW,
}

export interface ITaskInfo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  timestamp: Date;
}
export interface ITaskManagerCard {
  taskInfo: ITaskInfo;
  onSaveHandler: (editedTaskId: string, newTaskInfo: ITaskInfo) => void;
  onDeleteHandler: (taskInfo: ITaskInfo) => void
}
