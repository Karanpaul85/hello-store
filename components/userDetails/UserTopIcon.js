import Image from "next/image";
import styles from "./UserDetails.module.css";

const UserTopIcon = ({ email, name, picture }) => {
  return (
    <div className={styles.userDetailSec}>
      <Image
        src={picture}
        alt={name}
        height={44}
        width={44}
      />
    </div>
  );
};

export default UserTopIcon;
