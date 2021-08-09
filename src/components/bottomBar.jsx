import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addSong } from "../stores/action";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete'

const BottomBar = () => {
   const dispatch = useDispatch();
   const oneSong = (e) => {
      // console.log(e.currentTarget.files);
      dispatch(addSong(e.currentTarget.files));
   };
   return (
      <div className="bottom-bar">
         <div className="add-file">
            <input type="file" id="file" onChange={oneSong} />
            <label htmlFor="file">
               <div className="icon">
                  <AddIcon fontSize="small" />
               </div>
               <div className="caption">Add song</div>
            </label>
         </div>
         <div className="clear-songs">
            <button className="clear-all">
               <div className="icon">
                  <DeleteIcon fontSize="small" />
               </div>
               <div className="caption">Clear all</div>
            </button>
         </div>
         <div className="bottom-navigation">
            <IconButton>
               <Brightness4Icon />
            </IconButton>
            <IconButton>
               <InfoIcon />
            </IconButton>
         </div>
      </div>
   );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addSong }, dispatch);

export default connect(null, mapDispatchToProps)(BottomBar);
