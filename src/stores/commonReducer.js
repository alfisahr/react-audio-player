import { SELECTED_SONG } from "./action";

const initState = {
   selectedSong: -1,
};

const common = (state = initState, action) => {
   switch (action.type) {
      case SELECTED_SONG:
         return { ...state, selectedSong: action.id };
      default:
         return state;
   }
};

export default common;
