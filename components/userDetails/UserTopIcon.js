"use client";
import Image from "next/image";
import styles from "./UserDetails.module.css";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { setOpenDrawer } from "@/redux/slices/oneTapLoginSlice";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const UserTopIcon = ({ email, name, picture, emailVerifie }) => {
  const dispatch = useDispatch();
  const showMenu = () => {
    dispatch(setOpenDrawer(true));
  };
  return (
    <div className={styles.userDetailSec}>
      <Button
        onClick={showMenu}
        title="My Account"
        type="button"
        id="myAccount"
        ariaLabel="myAccount"
      >
        {emailVerifie ? (
          <Image src={picture} alt={name} height={44} width={44} />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
        )}
      </Button>
    </div>
  );
};

export default UserTopIcon;
