import styled, { keyframes } from "styled-components";

const SpinnerContainer = styled.div`
   height: 27px;
   width: 24px;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: flex-end;
`;

const key4 = keyframes`
0% {
    height: 10%;
}
60% {
    height: 60%;
}
100% {
    height: 80%;
}
`;
const key1 = keyframes`
0% {
    height: 5%;
}
100% {
    height: 30%;
}
`;
const key2 = keyframes`
0% {
    height: 5%;
}
50% {
    height: 20%;
}
100% {
    height: 70%;
}
`;
const key3 = keyframes`
0% {
    height: 0%;
}
100% {
    height: 40%;
}
`;
const key5 = keyframes`
0% {
    height: 0%;
}
70% {
    height: 10%;
}
100% {
    height: 55%;
}
`;

const BarOne = styled.div`
   width: 3px;
   height: 5%;
   background-color: #666;
   animation-name: ${key1};
   animation-duration: 1s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
`;
const BarTwo = styled.div`
   width: 3px;
   height: 5%;
   background-color: #666;
   animation-name: ${key2};
   animation-duration: 1.1s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
`;
const BarThree = styled.div`
   width: 3px;
   height: 0%;
   background-color: #666;
   animation-name: ${key3};
   animation-duration: 0.8s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
`;
const BarFour = styled.div`
   width: 3px;
   height: 10%;
   background-color: #666;
   animation-name: ${key4};
   animation-duration: 1.3s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
`;
const BarFive = styled.div`
   width: 3px;
   height: 0%;
   background-color: #666;
   animation-name: ${key5};
   animation-duration: 0.9s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
`;
const BarPause = styled.div`
   width: 3px;
   height: 25%;
   background-color: #666;
`;

function PlaySpinner() {
   return (
      <SpinnerContainer>
         <BarOne />
         <BarTwo />
         <BarThree />
         <BarFour />
         <BarFive />
      </SpinnerContainer>
   );
}

export function PauseSpinner() {
   return (
      <SpinnerContainer>
         <BarPause />
         <BarPause />
         <BarPause />
         <BarPause />
         <BarPause />
      </SpinnerContainer>
   );
}

export default PlaySpinner;
