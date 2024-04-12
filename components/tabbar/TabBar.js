import Link from "next/link";
import { tagList } from "../../src/constant/common_constants";
import styles from "./TobBar.module.css";
import { useRouter } from "next/router";
const Tabbar = ({ lang }) => {
  const router = useRouter();
  const { type } =
    Object.keys(router?.query).length > 0 ? router?.query : { type: "world" };
  if (lang === "hi") {
    return (
      <ul className={styles.tabBar}>
        {tagList[lang] &&
          tagList[lang].length > 0 &&
          tagList[lang].map((listItem) => {
            return (
              <li
                key={listItem.category}
                className={`${type === listItem.category && styles.active}`}
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
            <li
              key={listItem}
              className={`${type === listItem && styles.active}`}
            >
              <Link href={`/en/${listItem}`}>{listItem}</Link>
            </li>
          );
        })}
    </ul>
  );
};
export default Tabbar;
