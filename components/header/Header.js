import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import TopRight from "./TopRight/TopRight";
import { useSelector } from "react-redux";

const SearchBar = dynamic(() => import("../searchBar/SearchBar"))

const Header = () => {
  const { showSearch } = useSelector((state) => state.searchSlice);
  return (
    <header id="header" className={styles.header}>
      <div className="container">
        <div className={styles.topHeader}>
          <div className={styles.logo}>
            <Link href="/?asa=asas">
              <Image
                src="/assets/images/logo.jpg"
                width={80}
                height={80}
                alt=""
                priority
                blurDataURL="/assets/images/logo.jpg"
                placeholder="blur"
              />
            </Link>
          </div>
          <TopRight />
          {showSearch && <SearchBar />}
        </div>
      </div>
    </header>
  );
};
export default Header;
