"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FontAwesomeIcon from "../FontAwesomeIcon";
import styles from "./BottomBar.module.css";
import { showLangSec, showSearchSec } from "@/redux/slices/searchSlice";
import Button from "../Button";

const ShareBTN = dynamic(() => import("../shareBtn/ShareBTN"));
const PushNotification = dynamic(() =>
  import("../pushNotification/PushNotification")
);

const BottomBar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const pathname = usePathname();
  const { isAdmin } = useSelector((state) => state.oneTapLogin);
  const { showSearch } = useSelector((state) => state.searchSlice);
  const { notificationData } = useSelector((state) => state.notification) || {};

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      // Clear the previous timeout if still scrolling
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to detect scroll stop
      const timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 500); // Adjust delay to detect scroll stop

      setScrollTimeout(timeoutId);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isScrolling, scrollTimeout]);

  const router = useRouter();

  const dispatch = useDispatch();

  const toggleSearchBar = () => {
    showSearch ? dispatch(showSearchSec(false)) : dispatch(showSearchSec(true));
    dispatch(showLangSec(false));
  };

  return (
    <div
      className={`${styles.bottomBaarStrip} ${
        isScrolling && styles.hideBottomBar
      }`}
    >
      <ul className={styles.bottomBaar}>
        <li>
          <Link href="/" className={router.asPath == "/" ? "active" : ""}>
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className={router.asPath == "/profile" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </Link>
        </li>
        {pathname !== "/profile" && (
          <li>
            <Button
              onClick={toggleSearchBar}
              type="button"
              title="Search"
              ariaLabel="Search"
              id="bottomSearch"
              classes={styles.bottomBaarSearch}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>Search</span>
            </Button>
          </li>
        )}
        {pathname !== "/profile" && (
          <li>
            <ShareBTN />
          </li>
        )}

        {isAdmin &&
          notificationData &&
          Object.keys(notificationData).length > 0 && (
            <li>
              <PushNotification />
            </li>
          )}
      </ul>
    </div>
  );
};
export default BottomBar;
