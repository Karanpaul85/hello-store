import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FontAwesomeIcon from "../FontAwesomeIcon";
import styles from "./BottomBar.module.css";

const ShareBTN = dynamic(() => import("../shareBtn/ShareBTN"));
const PushNotification = dynamic(() =>
  import("../pushNotification/PushNotification")
);

const BottomBar = () => {
  const { isAdmin } = useSelector((state) => state.oneTapLogin);
  const { notificationData } = useSelector((state) => state.notification) || {};

  const router = useRouter();

  return (
    <ul className={styles.bottomBaar}>
      <li>
        <Link href="/" className={router.asPath == "/" ? "active" : ""}>
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link href="/eng" className={router.asPath == "/eng" ? "active" : ""}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </Link>
      </li>
      <li>
        <Link href="/" className={router.asPath == "/" ? "active" : ""}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <ShareBTN />
      </li>
      {isAdmin &&
        notificationData &&
        Object.keys(notificationData).length > 0 && (
          <li>
            <PushNotification />
          </li>
        )}
    </ul>
  );
};
export default BottomBar;
