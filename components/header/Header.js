import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header id="header" className={styles.header}>
      <Image
        src="/assets/images/logo.webp"
        width={80}
        height={80}
        alt=""
        priority
        blurDataURL="/assets/images/logo.webp"
        placeholder="blur"
      />
    </header>
  );
};
export default Header;
