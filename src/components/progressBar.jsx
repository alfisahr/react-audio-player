import { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import AppContext from "../AppContext";
import MusicNote from "@material-ui/icons/MusicNote";
import styled, { keyframes } from "styled-components";
import { SimpleDuration } from "./progressTime";

const progresses = keyframes`
0% {
   width: 0%;
}
100% {
   width: 100%;
}
`;

const Progress = styled.div`
   height: 5px;
   width: 0%;
   background-color: red;

      &.animate {
   animation-name: ${progresses};
   animation-duration: ${(props) => (props.songStated !== "none" ? props.duration : 0)}s;
   animation-timing-function: linear;
   animation-iteration-count:infinite;
   animation-play-state: ${(props) =>
      props.songStated === "onPlay" || props.songStated === "onResume" ? "running" : "paused"};         
      }

      &.resetanimate {
         animation-duration: 0;
         height: 30px;
      }
`;

const ProgressBar = ({ songPlay }) => {
   const appContext = useContext(AppContext);
   const [animate, setAnimate] = useState(false);

   useEffect(() => {
      setAnimate(false)
      if(songPlay.id > -1) {
         setAnimate(true)
      }
   }, [songPlay])

   return (
      <div className="progress-container">
         <div className="icon">
            <MusicNote fontSize="large" />
         </div>
         <div className="main-wrapper">
            <div className="song-info">
               <h3 className="song-name">{songPlay.name !== "" ? songPlay.name : "---"}</h3>
            </div>
            <div className="progress-countdown">00:00</div>
            <SimpleDuration />
            <div className="progress">
               <Progress className={animate ? 'animate' : 'resetanimate'} duration={appContext.onPlayDuration} songStated={songPlay.songStated} />
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({ songPlay: state.songPlay });
export default connect(mapStateToProps)(ProgressBar);
