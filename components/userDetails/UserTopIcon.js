import Image from "next/image";
import styles from "./UserDetails.module.css";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { setOpenDrawer } from "@/redux/slices/oneTapLoginSlice";

const UserTopIcon = ({ name, picture }) => {
  const dispatch = useDispatch();
  const showMenu = () => {
    console.log("clicked");
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
        <Image src={picture} alt={name} height={44} width={44} />
      </Button>
    </div>
  );
};

export default UserTopIcon;
