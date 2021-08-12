import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import {
   addPlaylist,
   editPlaylist,
   deletePlaylist,
   selectedPlaylist,
   unSelectedPlaylist,
} from "../stores/action";

const Playlist = ({ playlist, activePlaylist }) => {
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
   const handleDelete = (id) => {
      dispatch(deletePlaylist(id));
      setNewPlaylist({ ...newPlaylist, new: false });
   };
   const handleUnselected = (e) => {
      if (
         activePlaylist > -1 &&
         e.target.className === "playlist"
      ) {
         dispatch(unSelectedPlaylist());
      }
   };
   return (
      <div className="playlist" onClick={handleUnselected} style={{height: 'calc(100% - 100px)'}}>
         <div className="caption">
            <h3 className="title">Playlist</h3>
            <button
               disabled={newPlaylist.new ? true : false}
               onClick={handleAdd}
            >
               <PlaylistAddIcon />
            </button>
         </div>

         <ul className="list">
            {playlist &&
               playlist.map((pl, i) => {
                  return (
                     <li
                        key={i}
                        onClick={() => dispatch(selectedPlaylist(pl.id))}
                        className={activePlaylist === pl.id ? "selected" : ""}
                     >
                        <div className="icon">
                           <QueueMusicIcon />
                        </div>
                        <div className="playlist-name">
                           {newPlaylist.id === pl.id ? (
                              <input
                                 type="text"
                                 autoFocus={true}
                                 name="name"
                                 onChange={handleInputChange}
                                 value={newPlaylist.name}
                              />
                           ) : (
                              pl.name
                           )}
                        </div>
                        <div
                           className={
                              pl.id === newPlaylist.id ? `pnav` : `pnav hide`
                           }
                        >
                           {pl.id === newPlaylist.id ? (
                              <button onClick={handleConfirm}>
                                 <CheckIcon style={{ fontSize: "13px" }} />
                              </button>
                           ) : (
                              <button
                                 disabled={i === 0 ? true : false}
                                 onClick={(e) =>
                                    handleEdit(e, {
                                       id: pl.id,
                                       new: true,
                                       name: pl.name,
                                    })
                                 }
                              >
                                 <EditIcon style={{ fontSize: "13px" }} />
                              </button>
                           )}

                           <button
                              disabled={i === 0 ? true : false}
                              onClick={() => handleDelete(pl.id)}
                           >
                              <CloseIcon style={{ fontSize: "13px" }} />
                           </button>
                        </div>
                     </li>
                  );
               })}
         </ul>
      </div>
   );
};

const mapStateToProps = (state) => ({
   playlist: state.common.playlist,
   activePlaylist: state.common.selectedPlaylist,
});
const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         addPlaylist,
         editPlaylist,
         deletePlaylist,
         selectedPlaylist,
         unSelectedPlaylist,
      },
      dispatch
   );
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
