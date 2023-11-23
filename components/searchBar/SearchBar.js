import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";

import FontAwesomeIcon from "../FontAwesomeIcon";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showSearchSec } from "@/redux/slices/searchSlice";

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const handleChnage = (e) => {
    setSearch(e.target.value);
  };

  const searchNews = () => {
    router.push(`/search?q=${search}`);
    dispatch(showSearchSec(false))
  };
  return (
    <div className={styles.searcBarSection}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="Enter any keyword"
        ref={textInput}
        onChange={handleChnage}
      />
      <button onClick={searchNews}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
export default SearchBar;
