import { useEffect, useState, useContext } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import AppContext from "../AppContext";
import MusicNote from "@material-ui/icons/MusicNote";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import PlaySpinner, { PauseSpinner } from "./playSpinner";
import { playSong, selectedSong } from "../stores/action";

const SongList = ({ songs, songPlay, common }) => {
   const dispatch = useDispatch();
   const contextSongs = useContext(AppContext);
   const [songList, setSongList] = useState([]);
   useEffect(() => {
      if (songs.length > 0) {
         const reArrayOfSongs = contextSongs.songsFromStorage.map((song, i) => {
            return { name: song.name, hover: false, isPlaying: false };
         });
         setSongList(reArrayOfSongs);
      }
   }, [songs, contextSongs.songsFromStorage]);

   const handleMouseEnter = (e, id) => {
      const arr2 = songList.map((song, i) => {
         const returnVal = { ...song };
         if (i === id) {
            returnVal.hover = true;
         }
         return returnVal;
      });
      setSongList(arr2);
   };

   const handleMouseLeave = (e, id) => {
      const arr2 = songList.map((song, i) => {
         const returnVal = { ...song };
         if (i === id) {
            returnVal.hover = false;
         }
         return returnVal;
      });
      setSongList(arr2);
   };

   const handleClick = (e, id) => {
      dispatch(playSong(id));
   };

   const handleRowSelection = (e, id) => {
      dispatch(selectedSong(id));
   };

   function iconItem(songState, playingId, id, isHover) {
      if (songState === "onPlay" && playingId === id) {
         return isHover ? <PauseIcon /> : <PlaySpinner />;
      } else if (songState === "onPause" && playingId === id) {
         return isHover ? <PlayArrow /> : <PauseSpinner />;
      } else {
         return isHover ? <PlayArrow /> : <MusicNote />;
      }
   }

   if (songList.length > 0) {
      return (
         <div className="song-list-container">
            <ul className="song-list">
               {songList &&
                  songList.map((song, i) => {
                     return (
                        <li
                           onClick={(e) => handleRowSelection(e, i)}
                           key={i}
                           className={i === common.selectedSong ? "selected" : ""}
                        >
                           <div className="btn-play">
                              <button
                                 onClick={(e) =>
                                    handleClick(e, { id: i, name: song.name, isPlaying: true, songStated: "onPlay" })
                                 }
                                 onMouseEnter={(e) => handleMouseEnter(e, i)}
                                 onMouseLeave={(e) => handleMouseLeave(e, i)}
                              >
                                 {iconItem(songPlay.songStated, songPlay.id, i, song.hover)}
                              </button>
                           </div>
                           <div className="song-name">{song.name}</div>
                        </li>
                     );
                  })}
            </ul>
         </div>
      );
   } else {
      return <div className="song-list-container">ga ada file</div>;
   }
};

const mapStateToProps = (state) => ({ songs: state.songs, songPlay: state.songPlay, common: state.common });
const mapDispatchToProps = (dispatch) => bindActionCreators({ playSong, selectedSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
