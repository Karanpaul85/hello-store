import { wrapper } from "@/utils/withRedux";
import Router from "next/router";
import Image from "next/image";
import Layout from "../../../components/Layout";
import style from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faPowerOff,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import { removeCookie } from "@/utils/common";
import { useDispatch } from "react-redux";
import { userLogout } from "@/redux/slices/oneTapLoginSlice";
import { setNotificationData } from "@/redux/slices/notificationSlice";

const Profile = ({ userDetails }) => {
  const { email, email_verified, isAdmin, name, picture } = userDetails;
  const dispatch = useDispatch();

  dispatch(setNotificationData({}));

  const logout = () => {
    removeCookie("auth");
    dispatch(userLogout());
    Router.push("/");
  };
  return (
    <Layout topright={false} showBottomBar={true}>
      <div className={style.profileSection}>
        <div className={style.profileIconEmail}>
          {email_verified && (
            <>
              <div className={style.profileImage}>
                <Image src={picture} alt={name} height={44} width={44} />
              </div>
              <div className={style.userEmail}>{name}</div>
            </>
          )}
        </div>
        <ul className={style.items}>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            {email}
          </li>
          <li>
            <FontAwesomeIcon icon={faUserTie} />
            {isAdmin ? "Admin" : "User"}
          </li>
          <li>
            <FontAwesomeIcon icon={faKey} />
            Change Password
          </li>
          {/* <li>
            <FontAwesomeIcon icon={faPowerOff} />{" "}
            <Button
              type="button"
              title="logout"
              ariaLabel="logout"
              classes={style.button}
              id="logout"
              onClick={logout}
            >
              Logout
            </Button>
          </li> */}
        </ul>
      </div>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  () => async (ctx) => {
    const userDetails = JSON.parse(ctx?.req?.cookies?.auth);
    return {
      props: {
        userDetails,
      },
    };
  }
);
export default Profile;
