import { useContext } from "react";
// import localForage from "localforage";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import AppContext from "../AppContext";
import Grid from "@material-ui/core/Grid";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FastForward from "@material-ui/icons/FastForward";
import FastRewind from "@material-ui/icons/FastRewind";
import ProgressBar from "./progressBar";
import Volume from "./volume";
import { playSong, pauseSong, resumeSong } from "../stores/action";

const PlayBar = ({ songPlay, common }) => {
   const dispatch = useDispatch();
   const appContext = useContext(AppContext);

   const handlePlayBtn = () => {
      if (songPlay.songStated === "onPlay" || songPlay.songStated === "onResume") {
         dispatch(pauseSong());
         console.log("btn pause");
      } else if (songPlay.songStated === "onPause") {
         dispatch(resumeSong());
         console.log("btn resume");
      } else {
         const id = common.selectedSong === -1 ? 0 : common.selectedSong;
         dispatch(playSong({ id, name: appContext.songsFromStorage[id].name, isPlaying: true, songStated: "onPlay" }));
         console.log("btn play " + common.selectedSong);
      }
   };

   const handleNextBtn = () => {
      if (appContext.onPlayNext >= 0) {
         dispatch(
            playSong({
               id: appContext.onPlayNext,
               name: appContext.songsFromStorage[appContext.onPlayNext].name,
               isPlaying: true,
               songStated: "onPlay",
            })
         );
         console.log("btn next");
      }
   };

   const handlePrevBtn = () => {
      if (appContext.onPlayPrev >= 0) {
         dispatch(
            playSong({
               id: appContext.onPlayPrev,
               name: appContext.songsFromStorage[appContext.onPlayPrev].name,
               isPlaying: true,
               songStated: "onPlay",
            })
         );
         console.log("btn prev");
      }
   };
   return (
      <div className="playbar">
         <Grid container alignItems="center">
            <Grid item sm={3}>
               <div className="control-buttons">
                  <button className="rewind" onClick={handlePrevBtn}>
                     <FastRewind fontSize="small" />
                  </button>
                  <button className="play" aria-label="play" onClick={handlePlayBtn}>
                     {songPlay.isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrow fontSize="large" />}
                  </button>
                  <button className="forward" onClick={handleNextBtn}>
                     <FastForward fontSize="small" />
                  </button>
               </div>
            </Grid>
            <Grid item sm={6}>
               <ProgressBar />
            </Grid>
            <Grid item sm={3}>
               <Volume />
            </Grid>
         </Grid>
      </div>
   );
};

const mapStateToProps = (state) => ({ songPlay: state.songPlay, common: state.common });
const mapDispatchToProps = (dispatch) => bindActionCreators({ playSong, pauseSong, resumeSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar);
