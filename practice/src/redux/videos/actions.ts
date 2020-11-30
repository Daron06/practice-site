import { Action } from "redux";
import { VideosState } from "./reducer";

export interface VideoItem {
  title: string;
  text: string;
}

export interface Video {
  videoPath: string;
  number: string;
  lessonId: string;
}

export enum VideosActionsType {
  SET_ITEMS = 'videos/SET_ITEMS',
}

export interface SetVideosItemsActionInterface extends Action<VideosActionsType> {
  type: VideosActionsType.SET_ITEMS;
  payload: VideosState['items'];
}

export const setVideosItems = (payload: VideosState['items']): SetVideosItemsActionInterface => ({
  type: VideosActionsType.SET_ITEMS,
  payload
});

export type VideosActions = SetVideosItemsActionInterface;