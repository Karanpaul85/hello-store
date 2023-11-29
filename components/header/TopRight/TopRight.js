import { useDispatch, useSelector } from "react-redux";
import styles from "./TopRight.module.css";
import { showSearchSec, showLangSec } from "@/redux/slices/searchSlice";
import FontAwesomeIcon from "../../FontAwesomeIcon";
import {
  faMagnifyingGlass,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
const TopRight = () => {
  const { showSearch, showlang } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();
  const toggleSearchBar = () => {
    showSearch ? dispatch(showSearchSec(false)) : dispatch(showSearchSec(true));
    dispatch(showLangSec(false));
  };
  const showLanguages = () => {
    showlang ? dispatch(showLangSec(false)) : dispatch(showLangSec(true));
    dispatch(showSearchSec(false));
  };
  return (
    <div className={styles.topRight}>
      <Button
        onClick={toggleSearchBar}
        type="button"
        title="Search"
        ariaLabel="Search"
        id="search"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
      <Button
        onClick={showLanguages}
        type="button"
        title="language"
        ariaLabel="language"
        id="language"
      >
        <FontAwesomeIcon
          icon={faLanguage}
          beat
          size="2xl"
          style={{ width: "30px" }}
        />
      </Button>
    </div>
  );
};
export default TopRight;
