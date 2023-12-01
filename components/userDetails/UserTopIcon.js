import Image from "next/image";
import styles from "./UserDetails.module.css";
import Button from "../Button";

const UserTopIcon = ({ email, name, picture }) => {
  const test = () => {
    console.log("clicked");
  };
  return (
    <div className={styles.userDetailSec}>
      <Button
        onClick={test}
        title="My Account"
        type="button"
        id="myAccount"
        ariaLabel="myAccount"
      >
        <Image src={picture} alt={name} height={44} width={44} />
      </Button>
    </div>
  );
};

export default UserTopIcon;
