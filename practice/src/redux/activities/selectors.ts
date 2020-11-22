import { Immutable } from "immer";
import { RootState } from "../store";
import { Task } from "./actions";
import { TasksState } from "./reducer";

export const selectTasks = (state: RootState): Immutable<TasksState> => state.tasks;

export const selectTasksItems = (state: RootState): Immutable<TasksState['items']> => selectTasks(state).items;

export const selectTasksById = (id: string) => (state: RootState): Task | undefined => selectTasksItems(state).find(obj => obj.taskId === id);
