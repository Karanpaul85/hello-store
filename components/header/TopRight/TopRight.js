import { useDispatch, useSelector } from "react-redux";
import styles from "./TopRight.module.css";
import { showSearchSec } from "@/redux/slices/searchSlice";
import FontAwesomeIcon from "../../FontAwesomeIcon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const TopRight = () => {
  const { showSearch } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();
  const toggleSearchBar = () => {
    showSearch ? dispatch(showSearchSec(false)) : dispatch(showSearchSec(true));
  };
  return (
    <div className={styles.topRight}>
      <button onClick={toggleSearchBar}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};
export default TopRight;
