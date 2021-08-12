import { READY_TO_PLAY, PLAY_SONG, PAUSE_SONG, RESUME_SONG } from "./action";

const initState = {
   isPlaying: false,
   readyToPlay: false, // when button clicked until song really played
   songStated: "none", // it can be none, onPlay, onPause, onResume
   id: -1,
   name: "",
};

const songPlay = (state = initState, action) => {
   switch (action.type) {
      case READY_TO_PLAY:
         return { ...state, readyToPlay: true, id: action.id };
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
