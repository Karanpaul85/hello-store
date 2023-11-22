import Link from "next/link";
import { socialSharing } from "../../src/utils/socialShare";
import styles from "../shareBtn/shareBTN.module.css";
const SocialLinks = () => {
  const url =
    window !== undefined
      ? window.location.href
      : "https://breakingnewsapp.netlify.app/";
  return (
    <>
      <ul className={styles.socialLinkList}>
        {socialSharing &&
          socialSharing.length &&
          socialSharing.map((socialLink) => {
            return (
              <li key={socialLink.name}>
                <Link href={`${socialLink.url}${url}`} className={`${styles.icons} ${styles[socialLink.name]}`}/>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SocialLinks;