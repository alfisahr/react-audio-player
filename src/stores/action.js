export const ADD_SONG = "ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";
export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";
export const RESUME_SONG = "RESUME_SONG";
export const SELECTED_SONG = "SELECTED_SONG";
export const UNSELECTED_SONG = "UNSELECTED_SONG";
export const ADD_PLAYLIST = "ADD_PLAYLIST";
export const EDIT_PLAYLIST = "EDIT_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const CHANGE_VOLUME = "CHANGE_VOLUME";

export const addSong = (data) => ({
   type: ADD_SONG,
   data,
});

export const removeSong = (id) => ({
   type: REMOVE_SONG,
   id,
});

export const playSong = (data) => ({
   type: PLAY_SONG,
   data,
});

export const pauseSong = () => ({
   type: PAUSE_SONG,
});

export const resumeSong = () => ({
   type: RESUME_SONG,
});

export const selectedSong = (id) => ({
   type: SELECTED_SONG,
   id,
});

export const unSelectedSong = () => ({
   type: UNSELECTED_SONG,
});

export const addPlaylist = (data) => ({
   type: ADD_PLAYLIST,
   data,
});

export const editPlaylist = (data) => ({
   type: EDIT_PLAYLIST,
   data,
});

export const deletePlaylist = (id) => ({
   type: DELETE_PLAYLIST,
   id,
});

export const changeVolume = (data) => ({
   type: CHANGE_VOLUME,
   data,
});
