import dynamic from "next/dynamic";
import Image from "next/image";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import styles from "./Header.module.css";
import TopRight from "./TopRight/TopRight";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "./Navigation/MainNavigation";
import { useEffect } from "react";
import axios from "axios";
import { setUserDetails } from "@/redux/slices/oneTapLoginSlice";
import { useCookies } from "react-cookie";
import logo from "/public/assets/images/logo.svg";

const SearchBar = dynamic(() => import("../searchBar/SearchBar"));
const LanguageBar = dynamic(() => import("../languages/Languages"));

const Header = ({ topright }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["auth"]);
  const { auth } = cookies;
  const { showSearch, showlang } = useSelector((state) => state.searchSlice);
  useEffect(() => {
    if (auth) {
      auth.from = "local";
      dispatch(setUserDetails(auth));
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
            <a href="/">
              <div
                role="link"
                tabIndex={0}
                aria-label="Navigate to the destination page"
              >
                <Image
                  src={logo}
                  width={80}
                  height={80}
                  alt="Breaking News"
                  priority
                  sizes="100vw"
                />
              </div>
            </a>
          </div>
          {topright && <TopRight />}
          {showSearch && <SearchBar />}
          {showlang && <LanguageBar />}
        </div>
      </div>
      <MainNavigation />
    </header>
  );
};
Header.defaultProps = {
  topright: true,
};
export default Header;
