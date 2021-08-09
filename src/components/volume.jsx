import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { changeVolume } from "../stores/action";

const Range = styled.input`
   -webkit-appearance: none;
   width: 100%;
   height: 15px;
   border-radius: 5px;
   background: #999;
   outline: none;
   opacity: 0.7;
   -webkit-transition: 0.2s;
   transition: opacity 0.2s;

   &:hover {
      opacity: 1;
   }

   &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04aa6d;
      cursor: pointer;
   }

   &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04aa6d;
      cursor: pointer;
   }
`;

const Volume = ({ common }) => {
   const dispatch = useDispatch();
   const val = common.volume * 100;
   const [value, setValue] = useState(val);
   function handleChange(e) {
      // console.log(e.target.value);
      setValue(e.target.value);
      const newVal = parseInt(value / 100, 10);
      dispatch(changeVolume(newVal));
      // e.target.style.backgroundColor = `linear-gradient(to right,#4BD663,#4BD663 ${e.target.value}%,#eee ${e.target.value}%)`;
      // console.log(e.target.style.backgroundColor);
      // console.log(e.target.value);
   }
   return (
      <div className="volume-wrapper">
         <Grid container spacing={1}>
            <Grid item>
               <VolumeDown />
            </Grid>
            <Grid item xs>
               <Range type="range" min="1" max="100" value={value} onChange={handleChange} />
            </Grid>
            <Grid item>
               <VolumeUp />
            </Grid>
         </Grid>
      </div>
   );
};

const mapStateToProps = (state) => ({ common: state.common });
const mapDispatchToProps = (dispatch) => bindActionCreators({ changeVolume }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Volume);
