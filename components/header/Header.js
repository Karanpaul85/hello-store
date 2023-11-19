import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header id="header" className={styles.header}>
      <div className="container">
        <Image
          src="/assets/images/logo.jpg"
          width={80}
          height={80}
          alt=""
          priority
          blurDataURL="/assets/images/logo.jpg"
          placeholder="blur"
        />
      </div>
    </header>
  );
};
export default Header;
