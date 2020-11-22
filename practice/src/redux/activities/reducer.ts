import produce, { Draft } from 'immer';
import { Task, TasksActions, TasksActionsType } from './actions';

export interface TasksState {
  items: Task[];
}

export const initialTasksState: TasksState = {
  items: []
}

export const tasks = produce(
  (draft: Draft<TasksState>, action: TasksActions) => {
  switch (action.type) {
    case TasksActionsType.SET_TASKS:
      draft.items = action.payload;
      break;
    default:
      break;
    }
  }, initialTasksState
)