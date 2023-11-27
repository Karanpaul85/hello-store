import Link from "next/link";
import { tagList } from "../../src/constant/common_constants";
import styles from "./TobBar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Tabbar = ({ lang }) => {
  const router = useRouter();
  const [hash, sethash] = useState("world");
  useEffect(() => {
    if (router.asPath.split("#")[1]) {
      sethash(router.asPath.split("#")[1]);
    }
  }, [router.asPath]);

  if (lang === "hi") {
    return (
      <ul className={styles.tabBar}>
        {tagList[lang] &&
          tagList[lang].length > 0 &&
          tagList[lang].map((listItem) => {
            return (
              <li
                key={listItem.category}
                className={`${hash === listItem.category && styles.active}`}
              >
                <Link href={`/hi/${listItem.category}`}>
                  {listItem.translation}
                </Link>
              </li>
            );
          })}
      </ul>
    );
  }
  return (
    <ul className={styles.tabBar}>
      {tagList[lang] &&
        tagList[lang].length > 0 &&
        tagList[lang].map((listItem) => {
          return (
            <li key={listItem}>
              <Link href={`/en/${listItem.category}`}>{listItem}</Link>
            </li>
          );
        })}
    </ul>
  );
};
export default Tabbar;
