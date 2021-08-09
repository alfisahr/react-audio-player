import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import AppContext from "./AppContext";
import Sidebar from "./components/sidebar";
import MainBar from "./components/mainBar";
import { playSong } from "./stores/action";
import "./App.css";

function App({ songs, songPlay, common }) {
   const dispatch = useDispatch();
   const [onPlayDuration, setOnPlayDuration] = useState(0);
   const [onPlayCurrentTime, setOnPlayCurrentTime] = useState(0);
   const [onPlayNext, setOnPlayNext] = useState(-1);
   const [onPlayPrev, setOnPlayPrev] = useState(-1);
   const [songEnded, setSongEnded] = useState(false);

   const getNextSong = (extId, length) => {
      extId++;
      if (extId === length) {
         extId = 0;
      }
      return extId;
   };

   const getPrevSong = (extId, length) => {
      extId--;
      if (extId < 0) {
         extId = length - 1;
      }
      return extId;
   };

   useEffect(() => {
      if (!songEnded) return;
      dispatch(
         playSong({
            id: onPlayNext,
            name: songs[onPlayNext].name,
            isPlaying: true,
            songStated: "onPlay",
         })
      );
      setSongEnded(false);
   }, [songEnded, dispatch, onPlayNext, songs]);

   useEffect(() => {
      const audio_player = document.getElementById("audio_player");
      audio_player.onended = () => setSongEnded(true);
      if (songPlay.songStated === "onPlay") {
         async function playSong() {
            try {
               const audio_src = await URL.createObjectURL(songs[songPlay.id]);
               audio_player.src = audio_src;
               audio_player.play();
               console.log("play");
               audio_player.addEventListener("loadedmetadata", (e) => {
                  // var minutes = parseInt(e.target.duration / 60, 10);
                  // var seconds = parseInt(e.target.duration % 60);
                  setOnPlayDuration(audio_player.duration);
                  console.log(audio_player.duration);
                  // console.log(`${minutes}:${seconds}`);
                  setOnPlayNext(getNextSong(songPlay.id, songs.length));
                  setOnPlayPrev(getPrevSong(songPlay.id, songs.length));
               });
               // audio_player.volume = common.volume;
            } catch (err) {
               console.log(err);
            }
         }
         playSong();
      } else if (songPlay.songStated === "onPause") {
         audio_player.pause();
         setOnPlayCurrentTime(audio_player.currentTime);
         console.log("pause");
      } else if (songPlay.songStated === "onResume") {
         audio_player.play();
         console.log("resume");
      }
   }, [songs, songPlay]);

   return (
      <AppContext.Provider value={{ onPlayDuration, onPlayCurrentTime, onPlayNext, onPlayPrev }}>
         <div className="page-wrapper">
            <audio id="audio_player" preload="metadata" />
            <Sidebar />
            <MainBar />
         </div>
      </AppContext.Provider>
   );
}

const mapStateToProps = (state) => ({ songs: state.songs, songPlay: state.songPlay, common: state.common });
const mapDispatchToProps = (dispatch) => bindActionCreators({ playSong }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
