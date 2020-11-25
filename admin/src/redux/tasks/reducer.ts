import produce, { Draft } from "immer";
import { TasksActions, TasksActionsType, ITasksState } from "./types";

export const initialTasksState: ITasksState = {
  items: []
}

export const tasks = produce(
  (draft: Draft<ITasksState>, action: TasksActions) => {
  switch (action.type) {
    case TasksActionsType.SET_TASKS:
      draft.items = action.payload;
      break;
    default:
      break;
    }
  }, initialTasksState
)