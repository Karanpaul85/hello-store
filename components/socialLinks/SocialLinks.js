import Link from "next/link";
import { socialSharing } from "../../src/utils/socialShare";
const SocialLinks = () => {
  const url =
    window !== undefined
      ? window.location.href
      : "https://breakingnewsapp.netlify.app/";
  return (
    <>
      <ul>
        {socialSharing &&
          socialSharing.length &&
          socialSharing.map((socialLink) => {
            return (
              <li key={socialLink.name}>
                <Link href={`${socialLink.url}${url}`}>{socialLink.name}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SocialLinks;
