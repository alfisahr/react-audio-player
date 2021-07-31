import { connect } from "react-redux";
import MusicNote from "@material-ui/icons/MusicNote";
import styled, { keyframes } from "styled-components";

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
   animation-name: ${progresses};
   animation-duration: 180s;
   animation-timing-function: linear;
   animation-play-state: paused;
`;

const ProgressBar = ({ songPlay }) => {
   return (
      <div className="progress-container">
         <div className="icon">
            <MusicNote />
         </div>
         <div className="main-wrapper">
            <div className="song-info">
               <h3 className="song-name">{songPlay.name !== "" ? songPlay.name : "---"}</h3>
            </div>
            <div className="progress">
               <Progress />
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({ songPlay: state.songPlay });
export default connect(mapStateToProps)(ProgressBar);
