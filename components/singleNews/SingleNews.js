import styles from "./singleNews.module.css";
import { useState } from "react";
import imgDataURLs from "../../src/utils/imageUtil";
import dynamic from "next/dynamic";
const CustomImage = dynamic(() => import("../customImage"));

const SingleNews = ({
  newsdata,
  index,
  lang,
  category,
  isSearch,
  queryString,
}) => {
  const [showPlaceHolder, setPlaceHolder] = useState(false);
  const searchParm = isSearch ? `?from=${queryString}` : "";

  const onImageLoad = (e) => {
    setPlaceHolder(true);
  };
  return (
    <a
      href={`/${lang}/${category}/${newsdata.article_id}${searchParm}`}
      className={styles.newsCard}
    >
      {newsdata.image_url && (
        <div className={styles.tumbNail}>
          {index > 1 ? (
            <>
              <div
                className={
                  showPlaceHolder ? styles.tumbNailBlur : styles.placeHolder
                }
                style={{
                  backgroundImage: showPlaceHolder
                    ? `url(${newsdata.image_url})`
                    : `url(${imgDataURLs.placeholderImg})`,
                }}
              ></div>
              <CustomImage
                src={newsdata.image_url}
                width={300}
                height={300}
                alt={newsdata.title}
                loading="lazy"
                sizes="50vw"
                onLoad={onImageLoad}
              />
            </>
          ) : (
            <>
              <div
                className={
                  showPlaceHolder ? styles.tumbNailBlur : styles.placeHolder
                }
                style={{
                  backgroundImage: showPlaceHolder
                    ? `url(${newsdata.image_url})`
                    : `url(${imgDataURLs.placeholderImg})`,
                }}
              ></div>

              <CustomImage
                src={newsdata.image_url}
                width={300}
                height={300}
                alt={newsdata.title}
                priority={true}
                sizes="50vw"
                onLoad={onImageLoad}
              />
            </>
          )}
        </div>
      )}
      <div className={styles.newsContent}>
        <h2 className={styles.h2Hdeading}>{newsdata.title}</h2>
        <p className={styles.published}>Published at : {newsdata.pubDate}</p>
      </div>
    </a>
  );
};
export default SingleNews;
