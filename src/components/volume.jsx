import { useState, Fragment } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

// excess height to improve interactive area / accessibility
const height = "36px";
const thumbHeight = 16;
const trackHeight = "16px";
// colours
const upperColor = "#edf5f9";
const lowerColor = "#0199ff";
const thumbColor = "#ddd";
const thumbHoverColor = "#ccc";
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;

const makeLongShadow = (color, size) => {
   let i = 18;
   let shadow = `${i}px 0 0 ${size} ${color}`;

   for (; i < 706; i++) {
      shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
   }

   return shadow;
};

const Range = styled.input`
   overflow: hidden;
   display: block;
   appearance: none;
   max-width: 700px;
   width: 100%;
   margin: 0;
   height: ${height};
   cursor: pointer;

   &:focus {
      outline: none;
   }

   &::-webkit-slider-runnable-track {
      width: 100%;
      height: ${height};
      background: ${lowerBackground};
   }

   &::-webkit-slider-thumb {
      position: relative;
      appearance: none;
      height: ${thumbHeight}px;
      width: ${thumbHeight}px;
      background: ${thumbColor};
      border-radius: 100%;
      border: 0;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: ${makeLongShadow(upperColor, "-10px")};
      transition: background-color 150ms;
   }

   &::-moz-range-track,
   &::-moz-range-progress {
      width: 100%;
      height: ${height};
      background: ${upperBackground};
   }

   &::-moz-range-progress {
      background: ${lowerBackground};
   }

   &::-moz-range-thumb {
      appearance: none;
      margin: 0;
      height: ${thumbHeight};
      width: ${thumbHeight};
      background: ${thumbColor};
      border-radius: 100%;
      border: 0;
      transition: background-color 150ms;
   }

   &::-ms-track {
      width: 100%;
      height: ${height};
      border: 0;
      /* color needed to hide track marks */
      color: transparent;
      background: transparent;
   }

   &::-ms-fill-lower {
      background: ${lowerBackground};
   }

   &::-ms-fill-upper {
      background: ${upperBackground};
   }

   &::-ms-thumb {
      appearance: none;
      height: ${thumbHeight};
      width: ${thumbHeight};
      background: ${thumbColor};
      border-radius: 100%;
      border: 0;
      transition: background-color 150ms;
      /* IE Edge thinks it can support -webkit prefixes */
      top: 0;
      margin: 0;
      box-shadow: none;
   }

   &:hover,
   &:focus {
      &::-webkit-slider-thumb {
         background-color: ${thumbHoverColor};
      }
      &::-moz-range-thumb {
         background-color: ${thumbHoverColor};
      }
      &::-ms-thumb {
         background-color: ${thumbHoverColor};
      }
   }
`;

const Volume = () => {
   // const [value, setValue] = useState(10);
   // function handleChange(e, newVal) {
   //    setValue(newVal);
   // }
   return (
      <Fragment>
         <Grid container spacing={1}>
            <Grid item>
               <VolumeDown />
            </Grid>
            <Grid item xs>
               <Range type="range" />
            </Grid>
            <Grid item>
               <VolumeUp />
            </Grid>
         </Grid>
      </Fragment>
   );
};

export default Volume;
