import { combineReducers } from "redux";
import songs from "./songsReducer";
import songPlay from "./songPlayReducer";
import common from "./commonReducer";

const store = combineReducers({ songs, songPlay, common });
export default store;
