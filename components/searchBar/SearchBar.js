import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { showSearchSec } from "@/redux/slices/searchSlice";
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
      <button>Search</button>
      <button onClick={() => dispatch(showSearchSec(false))}>close</button>
    </div>
  );
};
export default SearchBar;
