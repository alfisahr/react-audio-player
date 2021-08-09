import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import AppContext from "./AppContext";
import localForage from "localforage";
import Sidebar from "./components/sidebar";
import MainBar from "./components/mainBar";
import { playSong } from "./stores/action";
import "./App.css";

function App({ songs, songPlay, common }) {
   const dispatch = useDispatch();
   const [songsFromStorage, setSongsFromStorage] = useState([]);
   const [onPlayDuration, setOnPlayDuration] = useState(0);
   const [onPlayCurrentTime, setOnPlayCurrentTime] = useState(0);
   const [onPlayNext, setOnPlayNext] = useState(-1);
   const [onPlayPrev, setOnPlayPrev] = useState(-1);
   const [songEnded, setSongEnded] = useState(false);
   useEffect(() => {
      if (songs.length > 0) {
         // async function getSongsFromStorage() {
         //    try {
         //       const lf = await localForage.getItem("state");
         //       let songFile = [];
         //       for (let x = 0; x < songs.length; x++) {
         //          if (lf.songs[x]) {
         //             songFile.push(lf.songs[x]);
         //          }
         //       }
         //       setSongsFromStorage(songFile);
         //    } catch (err) {
         //       console.log(err);
         //    }
         // }
         // console.log(songs);
         // getSongsFromStorage();
      }
   }, [songs]);

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
            name: songsFromStorage[onPlayNext].name,
            isPlaying: true,
            songStated: "onPlay",
         })
      );
      setSongEnded(false);
   }, [songEnded, dispatch, onPlayNext, songsFromStorage]);

   useEffect(() => {
      const audio_player = document.getElementById("audio_player");
      audio_player.onended = () => setSongEnded(true);
      if (songPlay.songStated === "onPlay") {
         async function playSong() {
            try {
               const audio_src = await URL.createObjectURL(songsFromStorage[songPlay.id]);
               audio_player.src = audio_src;
               audio_player.play();
               console.log("play");
               audio_player.addEventListener("loadedmetadata", (e) => {
                  // var minutes = parseInt(e.target.duration / 60, 10);
                  // var seconds = parseInt(e.target.duration % 60);
                  setOnPlayDuration(audio_player.duration);
                  console.log(audio_player.duration);
                  // console.log(`${minutes}:${seconds}`);
                  setOnPlayNext(getNextSong(songPlay.id, songsFromStorage.length));
                  setOnPlayPrev(getPrevSong(songPlay.id, songsFromStorage.length));
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
   }, [songPlay, songsFromStorage]);

   return (
      <AppContext.Provider value={{ songsFromStorage, onPlayDuration, onPlayCurrentTime, onPlayNext, onPlayPrev }}>
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
