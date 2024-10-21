import { useDispatch, useSelector } from "react-redux";
import styles from "./TopRight.module.css";
import { showSearchSec, showLangSec } from "@/redux/slices/searchSlice";
import FontAwesomeIcon from "../../FontAwesomeIcon";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { setOpenDrawer } from "@/redux/slices/oneTapLoginSlice";
import {
  faMagnifyingGlass,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import UserTopIcon from "../../userDetails/UserTopIcon";
const TopRight = () => {
  const { showSearch, showlang } = useSelector((state) => state.searchSlice);
  const { email, email_verified, name, picture } = useSelector(
    (state) => state.oneTapLogin
  );

  const dispatch = useDispatch();

  const showMenu = () => {
    dispatch(setOpenDrawer(true));
  };

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

      <UserTopIcon
        email={email}
        name={name}
        picture={picture}
        emailVerifie={email_verified}
      />
      <Button
        onClick={showMenu}
        title="My Account"
        type="button"
        id="myAccount"
        ariaLabel="myAccount"
        classes={styles.menuBtn}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
    </div>
  );
};
export default TopRight;
