import { Action } from "redux";
import { TasksState } from "./reducer";

export interface Task {
  taskId: string;
  number: number;
  status: 'completed' | 'rejected' | 'pending';
  createdAt: Date;
  responseAt: Date;
  description?: string;
  decision?: any;
  reference: string;
}

export enum TasksActionsType {
  SET_TASKS = 'tasks/SET_TASKS',
  SET_ACTIVITES = 'tasks/SET_ACTIVITES',
}

export interface SetTasksActionInterface extends Action<TasksActionsType> {
  type: TasksActionsType.SET_TASKS;
  payload: TasksState['items'];
}

export const setTasks = (payload: TasksState['items']): SetTasksActionInterface => ({
  type: TasksActionsType.SET_TASKS,
  payload
});

export type TasksActions = | SetTasksActionInterface;