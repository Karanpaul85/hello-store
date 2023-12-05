import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import TopRight from "./TopRight/TopRight";
import { useDispatch, useSelector } from "react-redux";
import { SwipeableDrawer } from "@mui/material";
import { useState } from "react";

import { setOpenDrawer } from "@/redux/slices/oneTapLoginSlice";

const SearchBar = dynamic(() => import("../searchBar/SearchBar"));
const LanguageBar = dynamic(() => import("../languages/Languages"));

const Header = () => {
  const dispatch = useDispatch();
  const { showSearch, showlang } = useSelector((state) => state.searchSlice);
  const { openDrawer } = useSelector((state) => state.oneTapLogin);
  // const [drawerOpen, setDrawerOpen] = useState(false);
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
            Test
          </SwipeableDrawer>
        </div>
      </div>
    </header>
  );
};
export default Header;
