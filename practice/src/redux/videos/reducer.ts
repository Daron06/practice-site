import produce, { Draft } from 'immer';
import { Video, VideosActions, VideosActionsType } from './actions';

export interface VideosState {
  items: Video[];
}

export const initialTasksState: VideosState = {
  items: []
}

export const videos = produce(
  (draft: Draft<VideosState>, action: VideosActions) => {
  switch (action.type) {
    case VideosActionsType.SET_ITEMS:
      draft.items = action.payload;
      break;
    default:
      break;
    }
  }, initialTasksState
)