import { useDispatch } from "react-redux";
import styles from "./TopRight.module.css";
import { showSearchSec } from "@/redux/slices/searchSlice";
const TopRight = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.topRight}>
      <button onClick={() => dispatch(showSearchSec(true))}>Search</button>
    </div>
  );
};
export default TopRight;
