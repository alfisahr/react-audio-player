import { useEffect, useState, useContext } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import AppContext from "../AppContext";
import MusicNote from "@material-ui/icons/MusicNote";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";
import useComponentVisible from "./outsideClick";
import PlaySpinner, { PauseSpinner } from "./playSpinner";
import { playSong, selectedSong, unSelectedSong, removeSong } from "../stores/action";

const SongList = ({ songs, songPlay, common }) => {
   const dispatch = useDispatch();

   const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
   useEffect(() => {
      if (!isComponentVisible) {
         dispatch(unSelectedSong());
      }
      console.log(isComponentVisible);
   }, [isComponentVisible, dispatch]);

   const contextSongs = useContext(AppContext);
   const [songList, setSongList] = useState([]);
   useEffect(() => {
      if (songs.length > 0) {
         const reArrayOfSongs = songs.map((song, i) => {
            return { name: song.name, hover: false, isPlaying: false };
         });
         setSongList(reArrayOfSongs);
         for(let x = 0; x < songs.length; x++) {
            console.log(songs[x].name);
         }
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
      setIsComponentVisible(true);
   };

   function iconItem(songState, playingId, id, isHover) {
      if (songState === "onPlay" && playingId === id) {
         return isHover ? <PauseIcon fontSize="small" /> : <PlaySpinner />;
      } else if (songState === "onPause" && playingId === id) {
         return isHover ? <PlayArrow fontSize="small" /> : <PauseSpinner />;
      } else {
         return isHover ? <PlayArrow fontSize="small" /> : <MusicNote fontSize="small" />;
      }
   }

   const handleRemoveSong = (e, id) => {
      dispatch(removeSong(id));
      console.log(id);
   };

   if (songList.length > 0) {
      return (
         <div className="song-list-container">
            <table ref={ref} className="tb-songlist">
               <thead>
                  <tr>
                     <td colSpan="2">Song</td>
                     <td>Artist</td>
                     <td>Album</td>
                     <td colSpan="2">Time</td>
                  </tr>
               </thead>
               <tbody>
                  {songList &&
                     songList.map((song, i) => {
                        return (
                           <tr
                              onClick={(e) => handleRowSelection(e, i)}
                              key={i}
                              className={i === common.selectedSong ? "selected" : ""}
                           >
                              <td className="btn-play">
                                 <button
                                    onClick={(e) =>
                                       handleClick(e, {
                                          id: i,
                                          name: song.name,
                                          isPlaying: true,
                                          songStated: "onPlay",
                                       })
                                    }
                                    onMouseEnter={(e) => handleMouseEnter(e, i)}
                                    onMouseLeave={(e) => handleMouseLeave(e, i)}
                                 >
                                    {iconItem(songPlay.songStated, songPlay.id, i, song.hover)}
                                 </button>
                              </td>
                              <td>{song.name}</td>
                              <td>#</td>
                              <td>#</td>
                              <td>#</td>
                              <td>
                                 <button className="del-song" onClick={(e) => handleRemoveSong(e, i)}>
                                    <DeleteIcon fontSize="small" />
                                 </button>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      );
   } else {
      return <div className="song-list-container">ga ada file</div>;
   }
};

const mapStateToProps = (state) => ({ songs: state.songs, songPlay: state.songPlay, common: state.common });
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ playSong, selectedSong, unSelectedSong, removeSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
