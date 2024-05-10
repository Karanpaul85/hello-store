import { tagList } from "../../src/constant/common_constants";
import styles from "./TobBar.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Tabbar = ({ lang }) => {
  const router = useRouter();
  const { type } =
    Object.keys(router?.query).length > 0 ? router?.query : { type: "world" };
  useEffect(() => {
    setTimeout(() => {
      const parentContainer = document.querySelector("#tabBar");
      const listContainer = document.querySelector("#tabBar ul");
      const activeListItem = document.querySelector(
        "#tabBar ul li[data-active=true]"
      );
      const totalWidth = Array.from(listContainer.children).reduce(
        (acc, child) => acc + child.offsetWidth,
        0
      );
      const distanceFromLeft =
        activeListItem.getBoundingClientRect().left -
        parentContainer.getBoundingClientRect().left;
      const maxScroll = totalWidth - (parentContainer.offsetWidth - 20);

      const targetScrollPos = Math.min(
        Math.max(distanceFromLeft - 100, 0),
        maxScroll
      );

      const scrollStep = (timestamp) => {
        const currentTime = Date.now();
        const elapsed = currentTime - timestamp;
        const duration = 1000; // Duration in milliseconds
        const easeInOutQuad = (t) =>
          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        if (elapsed < duration) {
          const progress = easeInOutQuad(elapsed / duration);
          const newScrollPos = Math.floor(
            parentContainer.scrollLeft +
              (targetScrollPos - parentContainer.scrollLeft) * progress
          );
          parentContainer.scrollLeft = newScrollPos;
          requestAnimationFrame(() => scrollStep(timestamp));
        } else {
          parentContainer.scrollLeft = targetScrollPos;
        }
      };

      const startTimestamp = Date.now();
      requestAnimationFrame(() => scrollStep(startTimestamp));
    }, 1000);
  }, [lang, type]);

  if (lang === "hi") {
    return (
      <div className={styles.tabBar} id="tabBar">
        <ul>
          {tagList[lang] &&
            tagList[lang].length > 0 &&
            tagList[lang].map((listItem) => {
              return (
                <li
                  key={listItem.category}
                  className={`${type === listItem.category && styles.active}`}
                  data-active={`${type === listItem.category ? true : false}`}
                >
                  <a
                    href={
                      listItem.category === "world"
                        ? "/"
                        : `/hi/${listItem.category}`
                    }
                  >
                    {listItem.translation}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.tabBar} id="tabBar">
      <ul>
        {tagList[lang] &&
          tagList[lang].length > 0 &&
          tagList[lang].map((listItem) => {
            return (
              <li
                key={listItem.category}
                className={`${type === listItem.category && styles.active}`}
                data-active={`${type === listItem.category ? true : false}`}
              >
                <a href={`/en/${listItem.category}`}>{listItem.category}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Tabbar;
