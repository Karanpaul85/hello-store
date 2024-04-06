import { setOpenDrawer, userLogout } from "@/redux/slices/oneTapLoginSlice";
import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MainNavigation.module.css";
import FontAwesomeIcon from "../../FontAwesomeIcon";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { removeCookie } from "@/utils/common";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("../../Button"));

const MainNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { openDrawer, name, picture, email_verified } = useSelector(
    (state) => state.oneTapLogin
  );
  const logout = () => {
    removeCookie("auth");
    dispatch(userLogout());
    dispatch(setOpenDrawer(false));
  };

  const loginFun = () => {
    dispatch(setOpenDrawer(false));
    router.push("/login");
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
          {email_verified ? (
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
          ) : (
            <Button
              type="button"
              title="logout"
              ariaLabel="logout"
              classes={styles.button}
              id="logout"
              onClick={loginFun}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
};
export default MainNavigation;
