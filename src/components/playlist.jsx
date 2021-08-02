import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { addPlaylist, editPlaylist, deletePlaylist } from "../stores/action";

const Playlist = ({ playlist }) => {
   const dispatch = useDispatch();
   const initNewPlaylist = { id: -1, new: false, name: "" };
   const [newPlaylist, setNewPlaylist] = useState(initNewPlaylist);
   const handleAdd = () => {
      const id = playlist.length + 1;
      dispatch(addPlaylist({ id, name: "New playlist" }));
      setNewPlaylist({ id, new: true, name: "New playlist" });
   };
   const handleEdit = (e, data) => {
      setNewPlaylist(data);
   };
   const handleConfirm = () => {
      dispatch(editPlaylist({ id: newPlaylist.id, name: newPlaylist.name }));
      setNewPlaylist(initNewPlaylist);
   };
   const handleInputChange = (e) => {
      setNewPlaylist({ ...newPlaylist, [e.target.name]: e.target.value });
   };
   return (
      <div className="playlist">
         <div className="caption">
            <h3 className="title">Playlist</h3>
            <button disabled={newPlaylist.new ? true : false} onClick={handleAdd}>
               <PlaylistAddIcon />
            </button>
         </div>

         <ul className="list">
            {playlist &&
               playlist.map((pl, i) => {
                  return (
                     <li key={i}>
                        <div className="icon">
                           <QueueMusicIcon />
                        </div>
                        <div className="playlist-name">
                           {newPlaylist.id === pl.id ? (
                              <input type="text" name="name" onChange={handleInputChange} value={newPlaylist.name} />
                           ) : (
                              pl.name
                           )}
                        </div>
                        <div className={pl.id === newPlaylist.id ? `pnav` : `pnav hide`}>
                           {pl.id === newPlaylist.id ? (
                              <button onClick={handleConfirm}>
                                 <CheckIcon fontSize="small" />
                              </button>
                           ) : (
                              <button onClick={(e) => handleEdit(e, { id: pl.id, new: true, name: pl.name })}>
                                 <EditIcon fontSize="small" />
                              </button>
                           )}

                           <button onClick={() => dispatch(deletePlaylist(pl.id))}>
                              <CloseIcon fontSize="small" />
                           </button>
                        </div>
                     </li>
                  );
               })}
         </ul>
      </div>
   );
};

const mapStateToProps = (state) => ({ playlist: state.common.playlist });
const mapDispatchToProps = (dispatch) => bindActionCreators({ addPlaylist, editPlaylist, deletePlaylist }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
