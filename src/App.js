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
   // const [songFiles, setSongFiles] = useState(null);
   useEffect(() => {
      if (songs.length > 0) {
         async function getSongsFromStorage() {
            try {
               const lf = await localForage.getItem("state");
               // let songName = [];
               let songFile = [];
               for (let x = 0; x < songs.length; x++) {
                  if (lf.songs[x]) {
                     // songName.push(lf.songs[x].name);
                     songFile.push(lf.songs[x]);
                  }
               }
               setSongsFromStorage(songFile);
               // setSongFiles(songFile);
            } catch (err) {
               console.log(err);
            }
         }
         getSongsFromStorage();
      }
   }, [songs]);

   useEffect(() => {
      const audio_player = document.getElementById("audio_player");
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
                  console.log(audio_player.duration);
                  setOnPlayDuration(audio_player.duration);
                  // console.log(`${minutes}:${seconds}`);
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

   // useEffect(() => {
   //    const audio_player = document.getElementById("audio_player");
   //    if (songPlay.isPlaying && songPlay.id !== -1 && songCurrentTime === 0) {
   //       async function playSong() {
   //          try {
   //             const audio_src = await URL.createObjectURL(songsFromStorage[songPlay.id]);
   //             audio_player.src = audio_src;
   //             audio_player.play();
   //             console.log("play");
   //             // audio_player.addEventListener("loadedmetadata", (e) => {
   //             //    var minutes = parseInt(e.target.duration / 60, 10);
   //             //    var seconds = parseInt(e.target.duration % 60);
   //             //    console.log(audio_player.duration);
   //             //    console.log(`${minutes}:${seconds}`);
   //             // });
   //          } catch (err) {
   //             console.log(err);
   //          }
   //       }
   //       playSong();
   //    } else if (!songPlay.isPlaying && songPlay.id !== -1 && songCurrentTime >= 0) {
   //       audio_player.pause();
   //       setSongCurrentTime(audio_player.currentTime);
   //       console.log("pause");
   //    } else if (songPlay.isPlaying && songPlay.id !== -1 && songCurrentTime > 0) {
   //       audio_player.play();
   //       console.log("resume");
   //    }
   // }, [songPlay, songsFromStorage, songCurrentTime]);

   return (
      <AppContext.Provider value={{ songsFromStorage }}>
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
