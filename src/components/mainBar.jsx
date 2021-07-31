import PlayBar from "./playBar";
import SongList from "./songList";
import BottomBar from "./bottomBar";

const MainBar = () => {
   return (
      <div className="mainbar">
         <PlayBar />
         <SongList />
         <BottomBar />
      </div>
   );
};

export default MainBar;
