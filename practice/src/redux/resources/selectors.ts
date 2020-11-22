import { Immutable } from "immer";
import { RootState } from "../store";
// import { Resource } from "./actions";
import { ResourcesState } from "./reducer";

export const selectResources = (state: RootState): Immutable<ResourcesState> => state.resources;

export const selectResourcesItems = (state: RootState): Immutable<ResourcesState['items']> => selectResources(state).items;
