import Link from "next/link";
import { socialSharing } from "../../src/utils/socialShare";
import styles from "../shareBtn/shareBTN.module.css";
import dynamic from "next/dynamic";
const CustomImage = dynamic(() => import("../customImage"));
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
                  <CustomImage
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
