"use client";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import SocialLinks from "../socialLinks/SocialLinks";
import styles from "./shareBTN.module.css";
import { useEffect, useState } from "react";
import Button from "../Button";
const ShareBTN = () => {
  const [isScrollingStop, setIsScrollingStop] = useState(true);
  const [isRealDevice, setIsRealDevice] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  useEffect(() => {
    let isUserScrolling = null;
    // Listen for scroll events
    if (typeof window !== undefined) {
      window?.addEventListener(
        "scroll",
        function () {
          console.log("KP");
          // Clear our timeout throughout the scroll
          setIsScrollingStop(false);
          window.clearTimeout(isUserScrolling);

          // Set a timeout to run after scrolling ends
          isUserScrolling = setTimeout(function () {
            // Run the callback
            setIsScrollingStop(true);
          }, 1000);
        },
        false
      );
    }

    console.log(isScrollingStop, "isScrollingStop");
  }, [isScrollingStop]);

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
      <Button
        onClick={isRealDevice ? realDevice : desktopShare}
        classes={`${styles.shareBtn} ${
          isScrollingStop ? styles.scrollingStop : ""
        }`}
        title="Social Share"
        ariaLabel="Social Share"
      >
        <FontAwesomeIcon icon={faShareAlt} />
        {isScrollingStop && <span style={{ marginLeft: 10 }}>Share</span>}
      </Button>
      {showSocialLinks && <SocialLinks />}
    </div>
  );
};
export default ShareBTN;
