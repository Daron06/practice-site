import { ISetTasksActionInterface, TasksActionsType, ITasksState } from "./types";

export const setTasks = (payload: ITasksState['items']): ISetTasksActionInterface => ({
  type: TasksActionsType.SET_TASKS,
  payload
});