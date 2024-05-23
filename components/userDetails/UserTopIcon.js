"use client";
import Image from "next/image";
import styles from "./UserDetails.module.css";
// import Button from "../Button";
// import { useDispatch } from "react-redux";
// import { setOpenDrawer } from "@/redux/slices/oneTapLoginSlice";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";

const UserTopIcon = ({ email, name, picture, emailVerifie }) => {
  // const dispatch = useDispatch();
  // const showMenu = () => {
  //   dispatch(setOpenDrawer(true));
  // };
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
          <Image src={picture} alt={name} height={44} width={44} />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
        )}
      </Link>
    </div>
  );
};

export default UserTopIcon;
