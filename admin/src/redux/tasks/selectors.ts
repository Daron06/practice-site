import { Immutable } from "immer";
import { RootState } from "../store";
import { ITasksState } from "./types";

export const selectTasks = (state: RootState): Immutable<ITasksState> => state.tasks;

export const selectTasksItems = (state: RootState): Immutable<ITasksState['items']> => selectTasks(state).items;