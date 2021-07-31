import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addSong } from "../stores/action";

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
            <label htmlFor="file">Choose new file</label>
         </div>
         <div className="clear-songs">
            <button>Clear all</button>
         </div>
         <div className="bottom-navigation">about</div>
      </div>
   );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addSong }, dispatch);

export default connect(null, mapDispatchToProps)(BottomBar);
