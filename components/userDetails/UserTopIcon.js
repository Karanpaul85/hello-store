"use client";
import styles from "./UserDetails.module.css";

import FontAwesomeIcon from "../FontAwesomeIcon";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const CustomImage = dynamic(() => import("../customImage"));

const UserTopIcon = ({ email, name, picture, emailVerifie }) => {
  const isUserLoggedIn = useSelector((state) => state.oneTapLogin);

  return (
    <div className={styles.userDetailSec}>
      <Link
        href={
          isUserLoggedIn?.email && isUserLoggedIn?.email_verified
            ? "/profile"
            : "/login"
        }
      >
        {emailVerifie ? (
          <CustomImage src={picture} alt={name} height={44} width={44} />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
        )}
      </Link>
    </div>
  );
};

export default UserTopIcon;
