export const ADD_SONG = "ADD_SONG";
export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";
export const RESUME_SONG = "RESUME_SONG";
export const SELECTED_SONG = "SELECTED_SONG";

export const addSong = (data) => ({
   type: ADD_SONG,
   data,
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
