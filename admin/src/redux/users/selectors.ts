import { Immutable } from "immer";
import { RootState } from "../store";
import { IUsersState } from "./types";

export const selectUsers = (state: RootState): Immutable<IUsersState> => state.users;

export const selectUsersItems = (state: RootState): Immutable<IUsersState['items']> => selectUsers(state).items;