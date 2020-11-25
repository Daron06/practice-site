import { Immutable } from "immer";
import { RootState } from "../store";
import { VideosState } from "./reducer";

export const selectVideos = (state: RootState): Immutable<VideosState> => state.videos;

export const selectVideosItems = (state: RootState): Immutable<VideosState['items']> => selectVideos(state).items;
