import { PLAY_SONG, PAUSE_SONG, RESUME_SONG } from "./action";

const initState = {
   isPlaying: false,
   songStated: "none", // it can be none, onPlay, onPause, onResume
   id: -1,
   name: "",
};

const songPlay = (state = initState, action) => {
   switch (action.type) {
      case PLAY_SONG:
         return { ...state, ...action.data };
      case PAUSE_SONG:
         return { ...state, isPlaying: false, songStated: "onPause" };
      case RESUME_SONG:
         return { ...state, isPlaying: true, songStated: "onResume" };
      default:
         return state;
   }
};

export default songPlay;
