import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header id="header" className={styles.header}>
      <div className="container">
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
    </header>
  );
};
export default Header;
