import MusicNote from "@material-ui/icons/MusicNote";

const Sidebar = () => {
   return (
      <div className="sidebar">
         <div className="title-app">
            <div className="icon">
               <MusicNote />
            </div>{" "}
            <h1>Audio Player</h1>
         </div>
         <div className="playlist">
            <h3 className="title">Playlist</h3>
            <ul className="list">
               <li>Default</li>
            </ul>
         </div>
      </div>
   );
};

export default Sidebar;
