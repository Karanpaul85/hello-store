import dynamic from "next/dynamic";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./Header.module.css";
import Link from "next/link";
import TopRight from "./TopRight/TopRight";
import { useSelector } from "react-redux";
import MainNavigation from "./Navigation/MainNavigation";

const SearchBar = dynamic(() => import("../searchBar/SearchBar"));
const LanguageBar = dynamic(() => import("../languages/Languages"));

const Header = () => {
  const { showSearch, showlang } = useSelector((state) => state.searchSlice);
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
                <Image
                  src="/assets/images/logo.jpg"
                  width={80}
                  height={80}
                  alt="Breaking News"
                  priority
                  blurDataURL="/assets/images/logo.jpg"
                  placeholder="blur"
                />
              </div>
            </Link>
          </div>
          <TopRight />
          {showSearch && <SearchBar />}
          {showlang && <LanguageBar />}
        </div>
      </div>
      <MainNavigation />
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </header>
  );
};
export default Header;
