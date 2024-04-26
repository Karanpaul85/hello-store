import Link from "next/link";
import Image from "next/image";
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
                <Link
                  href={`${socialLink.url}${url}`}
                  data-action={socialLink?.dataAction}
                  className={`${styles.icons}`}
                >
                  <Image
                    src={`/assets/icons/${socialLink.icon}.svg`}
                    width={24}
                    height={24}
                    alt={socialLink.name}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SocialLinks;
