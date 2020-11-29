import { Action } from "redux";

export enum TasksActionsType {
  SET_TASKS = 'tasks/SET_TASKS'
}

export interface ITask {
  status: 'completed' | 'rejected' | 'pending';
  taskId: string;
  number: number;
  createdAt: Date;
  responseAt?: Date;
  newTask: boolean;
  description?: string;
  reference?: string;
  uid: string;
}


export interface ITasksState {
  items: ITask[];
}

export interface ISetTasksActionInterface extends Action<TasksActionsType> {
  type: TasksActionsType.SET_TASKS;
  payload: ITasksState['items'];
}

export type TasksActions = | ISetTasksActionInterface;
