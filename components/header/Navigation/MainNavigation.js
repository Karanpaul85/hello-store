import { setOpenDrawer, userLogout } from "@/redux/slices/oneTapLoginSlice";
import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MainNavigation.module.css";
import FontAwesomeIcon from "../../FontAwesomeIcon";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Button from "../../Button";
import { removeCookie } from "@/utils/common";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { openDrawer, name, picture, email_verified } = useSelector(
    (state) => state.oneTapLogin
  );
  const logout = () => {
    removeCookie("auth");
    dispatch(userLogout());
    dispatch(setOpenDrawer(false));
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={openDrawer}
      onClose={() => {
        dispatch(setOpenDrawer(false));
      }}
      onOpen={() => {
        dispatch(setOpenDrawer(false));
      }}
    >
      <div className={styles.mainMenu}>
        <div className={styles.navUserSection}>
          <div className={styles.userIconsSec}>
            {email_verified ? (
              <Image
                src={picture}
                alt={name}
                height={44}
                width={44}
                className={styles.userIcon}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.userIcon}
              />
            )}
          </div>
          <div className={styles.userName}>{name ? name : "Hi Guest!"}</div>
          {email_verified && (
            <Button
              type="button"
              title="logout"
              ariaLabel="logout"
              classes={styles.button}
              id="logout"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
};
export default MainNavigation;
