import dynamic from "next/dynamic";
import Image from "next/image";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { firBaseApp, messaging } from "../../src/firebase";
import { getMessaging, getToken } from "firebase/messaging";
import styles from "./Header.module.css";
import Link from "next/link";
import TopRight from "./TopRight/TopRight";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserDetails } from "@/redux/slices/oneTapLoginSlice";
import { useCookies } from "react-cookie";
import logo from "/public/assets/images/logo.svg";
import Announcement from "../announcemant";

const SearchBar = dynamic(() => import("../searchBar/SearchBar"));
const LanguageBar = dynamic(() => import("../languages/Languages"));
const MainNavigation = dynamic(() => import("./Navigation/MainNavigation"));
const CustomImage = dynamic(() => import("../customImage"));

const Header = ({ topright }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["auth"]);
  const { auth } = cookies;
  const { showSearch, showlang } = useSelector((state) => state.searchSlice);

  //user notification
  async function requestPermission() {
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // gernrate token
        const messaging = getMessaging(firBaseApp);
        const token = await getToken(messaging, {
          vapidKey:
            "BEWVewYC3Vja2sC3qQ12-JYZubW9p0797eHaiHLZUQixgCQQ_N-oKLnAbHmcuHIpdgwUc_FAY-d5EtwP7QvmVHg",
        });
        await axios.post("/api/notificationToken", { token });
        // console.log(resp.data, "resp", token);
      }
    }
  }

  const success = ({ coords }) => {
    console.log(coords);
  };
  const error = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (auth) {
      auth.from = "local";
      dispatch(setUserDetails(auth));
      navigator.geolocation.getCurrentPosition(success, error);
      requestPermission(messaging);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGoogleOneTapLogin(
    auth
      ? {
          disabled: true,
        }
      : {
          onSuccess: async (credentialResponse) => {
            if (credentialResponse.credential) {
              const resp = await axios("/api/users", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${credentialResponse.credential}`,
                },
              });
              resp.data.from = "api";
              dispatch(setUserDetails(resp.data));
              if (resp.data) {
                navigator.geolocation.getCurrentPosition(success, error);
                requestPermission(messaging);
              }
            }
          },
          onError: () => {
            console.log("Login Failed");
          },
        }
  );

  return (
    <header id="header" className={styles.header}>
      <div className="container">
        <div className={styles.topHeader}>
          <div className={styles.logo}>
            <Link href="/" passHref>
              <div
                role="link"
                tabIndex={0}
                aria-label="Navigate to the destination page"
              >
                <CustomImage
                  src={logo}
                  width={80}
                  height={80}
                  alt="Breaking News"
                  priority
                  sizes="100vw"
                />
              </div>
            </Link>
          </div>
          {topright && <TopRight />}
          {showSearch && <SearchBar />}
          {showlang && <LanguageBar />}
        </div>
      </div>
      <MainNavigation />
      <Announcement />
    </header>
  );
};
Header.defaultProps = {
  topright: true,
};
export default Header;
