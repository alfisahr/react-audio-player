import { SELECTED_SONG, UNSELECTED_SONG, ADD_PLAYLIST, EDIT_PLAYLIST, DELETE_PLAYLIST, CHANGE_VOLUME } from "./action";

const initState = {
   selectedSong: -1,
   volume: 0.5,
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
      case UNSELECTED_SONG:
         return { ...state, selectedSong: -1 };
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
      case CHANGE_VOLUME: {
         return { ...state, volume: action.data };
      }
      default:
         return state;
   }
};

export default common;
