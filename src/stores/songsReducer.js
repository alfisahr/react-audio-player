import { ADD_SONG, REMOVE_SONG } from "./action";

const songs = (state = [], action) => {
   switch (action.type) {
      case ADD_SONG:
         return [...state, ...action.data];
      case REMOVE_SONG:
         return state.filter((song, i) => i !== action.id);
      default:
         return state;
   }
};

export default songs;
