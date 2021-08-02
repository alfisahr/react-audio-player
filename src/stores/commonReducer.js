import { SELECTED_SONG, ADD_PLAYLIST, EDIT_PLAYLIST, DELETE_PLAYLIST } from "./action";

const initState = {
   selectedSong: -1,
   playlist: [
      {
         id: 0,
         name: "Default",
      },
   ],
};

const common = (state = initState, action) => {
   switch (action.type) {
      case SELECTED_SONG:
         return { ...state, selectedSong: action.id };
      case ADD_PLAYLIST:
         return { ...state, playlist: [...state.playlist, action.data] };
      case EDIT_PLAYLIST: {
         const playlist = state.playlist.map((pl) => {
            if (pl.id === action.data.id) {
               pl.name = action.data.name;
            }
            return pl;
         });
         return { ...state, playlist };
      }
      case DELETE_PLAYLIST: {
         const playlist = state.playlist.filter((pl) => pl.id !== action.id);
         return { ...state, playlist };
      }
      default:
         return state;
   }
};

export default common;
