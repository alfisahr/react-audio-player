import MusicNote from "@material-ui/icons/MusicNote";
import Playlist from "./playlist";

const Sidebar = () => {
   return (
      <div className="sidebar">
         <div className="title-app">
            <div className="icon">
               <MusicNote />
            </div>{" "}
            <h1>Audio Player</h1>
         </div>
         <Playlist />
      </div>
   );
};

export default Sidebar;
