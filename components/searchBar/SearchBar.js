import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { showSearchSec } from "@/redux/slices/searchSlice";

import FontAwesomeIcon from "../FontAwesomeIcon";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current?.focus();
  }, []);
  return (
    <div className={styles.searcBarSection}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="Enter any keyword"
        ref={textInput}
      />
      <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} beat/>
      </button>
      <button onClick={() => dispatch(showSearchSec(false))}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};
export default SearchBar;
