import { ISetUsersActionInterface, UsersActionsType, IUsersState } from "./types";

export const setUsers = (payload: IUsersState['items']): ISetUsersActionInterface => ({
  type: UsersActionsType.SET_USERS,
  payload
});