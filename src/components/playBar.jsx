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
import { playSong, pauseSong, resumeSong } from "../stores/action";

const PlayBar = ({ songPlay }) => {
   const dispatch = useDispatch();
   const contextSongs = useContext(AppContext);
   // const [songs, setSongs] = useState(null);
   // useEffect(() => {
   //    async function getSongs() {
   //       try {
   //          const lf = await localForage.getItem("state");
   //          setSongs(URL.createObjectURL(lf.songs[0]));
   //       } catch (err) {
   //          console.log(err);
   //       }
   //    }
   //    getSongs();
   // }, []);
   const handlePlayBtn = () => {
      // if (!songPlay.isPlaying && songPlay.id === -1 && contextCurrentTime.songCurrentTime === 0) {
      //    dispatch(playSong({ id: 0, name: contextSongs.songsFromStorage[0].name, isPlaying: true }));
      //    console.log("btn play");
      // } else if (songPlay.isPlaying && songPlay.id !== -1 && contextCurrentTime.songCurrentTime >= 0) {
      //    dispatch(pauseSong());
      //    console.log("btn pause");
      // } else if (!songPlay.isPlaying && songPlay.id !== -1 && contextCurrentTime.songCurrentTime > 0) {
      //    dispatch(resumeSong());
      //    console.log("btn resume");
      // }
      if (songPlay.songStated === "onPlay" || songPlay.songStated === "onResume") {
         dispatch(pauseSong());
         console.log("btn pause");
      } else if (songPlay.songStated === "onPause") {
         dispatch(resumeSong());
         console.log("btn resume");
      } else {
         dispatch(
            playSong({ id: 0, name: contextSongs.songsFromStorage[0].name, isPlaying: true, songStated: "onPlay" })
         );
         console.log("btn play");
      }
   };
   return (
      <div className="playbar">
         <Grid container>
            <Grid item sm={3}>
               <div className="control-buttons">
                  <button className="rewind">
                     <FastRewind fontSize="small" />
                  </button>
                  <button className="play" aria-label="play" onClick={handlePlayBtn}>
                     {songPlay.isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrow fontSize="large" />}
                  </button>
                  <button className="forward">
                     <FastForward fontSize="small" />
                  </button>
               </div>
            </Grid>
            <Grid item sm={6}>
               <ProgressBar />
            </Grid>
            <Grid item sm={3}>
               volume
            </Grid>
         </Grid>
      </div>
   );
};

const mapStateToProps = (state) => ({ songPlay: state.songPlay });
const mapDispatchToProps = (dispatch) => bindActionCreators({ playSong, pauseSong, resumeSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar);
