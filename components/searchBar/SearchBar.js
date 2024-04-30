import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";

import FontAwesomeIcon from "../FontAwesomeIcon";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showSearchSec } from "@/redux/slices/searchSlice";
import { allConst } from "@/constant/common_constants";
import Button from "../Button";

const SearchBar = () => {
  const router = useRouter();
  const { lang } = router.query;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);
  const textInput = useRef(null);
  const { textConst } = allConst;

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const handleChnage = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      setSearchError(false);
    }
  };

  const searchNews = () => {
    if (search.length >= 3) {
      router.push(`/search?q=${search}&lang=${lang ? lang : "hi"}`);
      dispatch(showSearchSec(false));
    } else {
      setSearchError(true);
    }
  };
  return (
    <div className={styles.searcBarSection}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder={
          !searchError
            ? "Enter any keyword"
            : textConst.SEARCH_ERROR_PLACEHOLDER
        }
        ref={textInput}
        onChange={handleChnage}
        className={searchError && styles.error}
      />
      <Button
        onClick={searchNews}
        type="button"
        title="continue search"
        ariaLabel="searchBtn"
        id="searchBtn"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};
export default SearchBar;
