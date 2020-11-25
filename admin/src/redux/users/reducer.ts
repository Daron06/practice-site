import produce, { Draft } from "immer";
import { UsersActions, UsersActionsType, IUsersState } from "./types";

export const initialUsersState: IUsersState = {
  items: []
}

export const users = produce(
  (draft: Draft<IUsersState>, action: UsersActions) => {
  switch (action.type) {
    case UsersActionsType.SET_USERS:
      draft.items = action.payload;
      break;
    default:
      break;
    }
  }, initialUsersState
)