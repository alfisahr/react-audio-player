import { ADD_SONG } from "./action";

const songs = (state = [], action) => {
   switch (action.type) {
      case ADD_SONG:
         return [...state, ...action.data];
      default:
         return state;
   }
};

export default songs;
