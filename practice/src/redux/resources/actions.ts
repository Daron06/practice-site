import { Action } from "redux";
import { ResourcesState } from "./reducer";

export interface ResourceItem {
  title: string;
  text: string;
}

export interface Resource {
  groupName: string;
  items: ResourceItem[];
}

export enum ResourcesActionsType {
  SET_ITEMS = 'resources/SET_ITEMS',
}

export interface SetResourcesItemsActionInterface extends Action<ResourcesActionsType> {
  type: ResourcesActionsType.SET_ITEMS;
  payload: ResourcesState['items'];
}

export const setResourcesItems = (payload: ResourcesState['items']): SetResourcesItemsActionInterface => ({
  type: ResourcesActionsType.SET_ITEMS,
  payload
});

export type ResourcesActions = SetResourcesItemsActionInterface;