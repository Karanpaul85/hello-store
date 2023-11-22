import SocialLinks from "../socialLinks/SocialLinks";
import styles from "./shareBTN.module.css";
import { useEffect, useState } from "react";
const ShareBTN = () => {
  const [isRealDevice, setIsRealDevice] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  useEffect(() => {
    navigator.share && setIsRealDevice(true);
  }, []);

  const desktopShare = () => {
    showSocialLinks ? setShowSocialLinks(false) : setShowSocialLinks(true);
  };
  const realDevice = () => {
    const title = document.title;
    const text = "Check this out!";
    const url = window.location.href;
    if (navigator.share !== undefined) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => console.log("Shared!"))
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className={styles.socialShare}>
      <button
        className={`${styles.shareBtn} ${styles.icons}`}
        onClick={isRealDevice ? realDevice : desktopShare}
      ></button>
      {showSocialLinks && <SocialLinks />}
    </div>
  );
};
export default ShareBTN;
