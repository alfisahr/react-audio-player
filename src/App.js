import { useEffect, useState } from "react";
import { connect } from "react-redux";
import AppContext from "./AppContext";
import localForage from "localforage";
import Sidebar from "./components/sidebar";
import MainBar from "./components/mainBar";
import "./App.css";

function App({ songs, songPlay }) {
   const [songsFromStorage, setSongsFromStorage] = useState([]);
   const [onPlayDuration, setOnPlayDuration] = useState(0);
   const [onPlayCurrentTime, setOnPlayCurrentTime] = useState(0);
   const [onPlayNext, setOnPlayNext] = useState(-1);
   const [onPlayPrev, setOnPlayPrev] = useState(-1);
   useEffect(() => {
      if (songs.length > 0) {
         async function getSongsFromStorage() {
            try {
               const lf = await localForage.getItem("state");
               let songFile = [];
               for (let x = 0; x < songs.length; x++) {
                  if (lf.songs[x]) {
                     songFile.push(lf.songs[x]);
                  }
               }
               setSongsFromStorage(songFile);
            } catch (err) {
               console.log(err);
            }
         }
         getSongsFromStorage();
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
      const audio_player = document.getElementById("audio_player");
      audio_player.onended = () => console.log("end song");
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

const mapStateToProps = (state) => ({ songs: state.songs, songPlay: state.songPlay });

export default connect(mapStateToProps)(App);
