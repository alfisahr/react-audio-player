import { useEffect, useState, useContext } from "react";
import AppContext from "../AppContext";

export const CountUp = () => {
   return <p>ok</p>;
};

export const SimpleDuration = () => {
   const appContext = useContext(AppContext);
   const getMinutes = () => parseInt(appContext.onPlayDuration / 60, 10);
   const getSeconds = () => parseInt(appContext.onPlayDuration % 60);
   return <div className="progress-countup">{`${getMinutes()}:${getSeconds()}`}</div>;
};

export default function CountDown() {
   const appContext = useContext(AppContext);
   // const time = appContext.onPlayDuration > 0 ? parseInt(appContext.onPlayDuration, 10) : 0;
   // const [countDown, setCountDown] = useState(0);
   const [countDownMin, setCountDownMin] = useState(0);
   const [countDownSec, setCountDownSec] = useState(0);

   const getMinutes = (time) => parseInt(time / 60, 10);
   const getSeconds = (time) => parseInt(time % 60);

   useEffect(() => {
      if (appContext.onPlayDuration === 0) return;
      setCountDownMin(getMinutes(appContext.onPlayDuration));
      setCountDownSec(getSeconds(appContext.onPlayDuration));
      console.log(appContext.onPlayDuration);
   }, [appContext.onPlayDuration]);

   useEffect(() => {
      if (appContext.onPlayDuration === 0) return;
      const seconds = setInterval(() => {
         setCountDownSec(countDownSec - 1);
      }, 1000);
      return () => clearInterval(seconds);
   }, [appContext.onPlayDuration, countDownSec]);

   return <div className="progress-countdown">{countDownSec}</div>;
}
