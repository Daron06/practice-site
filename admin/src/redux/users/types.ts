import { Action } from "redux";

export enum UsersActionsType {
  SET_USERS = 'users/SET_USERS'
}

export interface IUser {
  accepted: boolean;
  displayName?: string;
  email?: string;
  learningFlow: number;
  photoURL?: string;
  uid: string;
}

export interface IUsersState {
  items: IUser[]
}

export interface ISetUsersActionInterface extends Action<UsersActionsType> {
  type: UsersActionsType.SET_USERS;
  payload: IUsersState['items'];
}

export type UsersActions = | ISetUsersActionInterface;