import produce, { Draft } from 'immer';
import { Resource, ResourcesActions, ResourcesActionsType } from './actions';

export interface ResourcesState {
  items: Resource[];
}

export const initialTasksState: ResourcesState = {
  items: []
}

export const resources = produce(
  (draft: Draft<ResourcesState>, action: ResourcesActions) => {
  switch (action.type) {
    case ResourcesActionsType.SET_ITEMS:
      draft.items = action.payload;
      break;
    default:
      break;
    }
  }, initialTasksState
)