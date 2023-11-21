import styles from "./share.module.css";
import { useEffect, useState } from "react";
const ShareBTN = () => {
  const [isRealDevice, setIsRealDevice] = useState(false);
  useEffect(() => {
    navigator.share && setIsRealDevice(true);
  }, []);

  const desktopShare = () => {
    console.log("desktop");
  };
  const realDevice = () => {
    alert("realDevice");
  };
  return (
    <button
      className={styles.shareBtn}
      onClick={isRealDevice ? realDevice : desktopShare}
    >
      share
    </button>
  );
};
export default ShareBTN;
